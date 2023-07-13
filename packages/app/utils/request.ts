import axios from 'axios';
import { API_URL } from './constants';
import { store } from '../App';
import { Platform } from '../components/Platform';
import RNFetchBlob from './fetchBlob';
import { I18nManager } from 'react-native';
import Sentry from '../components/Sentry';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function isSuccess(response) {
  if (response.status && response.status === 'error' && response.Result) {
    let lang = store.getState().language.locale;
    if (
      lang === 'ar' &&
      response.result_arabic &&
      response.result_arabic !== ''
    ) {
      throw new Error(response.result_arabic);
      // } else if (
      //   lang === 'ar' &&
      //   response.result_arabic &&
      //   response.result_arabic !== ''
      // ) {
      //   throw new Error(response.Result);
    } else {
      throw new Error(response.Result);
    }
  } else if (
    response.data &&
    response.data.status === 'error' &&
    response.data.Result
  ) {
    throw new Error(response.data.Result);
  } else if (response.data && response.data.status === 'error') {
    throw new Error('Error response with no message');
  }
}

function handleErros(err) {
  // Sentry.captureException(`M Error :  ${JSON.stringify(err)}`);
  if (err.response) {
    if (err.response.data && err.response.data.message) {
      throw new Error(err.response.data.message);
    } else {
      throw new Error('Problem with response ' + err.response.status);
    }
  } else if (err.request) {
    throw new Error(
      I18nManager.isRTL
        ? 'خطأ في الاتصال بجهاز الخادم'
        : 'Problem with request!'
    );
  } else {
    throw new Error(err.message);
  }
}

export const handleJsonErrors = ({ graphQLErrors, networkError }: any) => {
  if (graphQLErrors) {
    if (graphQLErrors && graphQLErrors[0] && graphQLErrors[0].message) {
      return JSON.parse(graphQLErrors[0].message);
    }
    // graphQLErrors.map(({ message, locations, path }) =>
    //   console.log(
    //     `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
    //       locations
    //     )}, Path: ${path}`
    //   )
    // );
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
};

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}

/**
 * Requests a URL as GET, returning a data on success or error on fail
 *
 * @param {string} url
 * @param {object} [params={...data}] params to send along with request
 * @param {boolean} token wether request need to pass token or not
 * @returns {any}
 */
async function _get(url, params = {}, token = false, isSuccessCallBack = null) {
  try {
    const instance = getAxiosInstance(token);

    const response = await instance.get(`${url}`, params);

    // check if success or throw error
    if (isSuccessCallBack !== null) {
      isSuccessCallBack(response);
    } else {
      isSuccess(response);
    }

    return response.data;
  } catch (err) {
    handleErros(err);
  }
}

/**
 * Requests a URL as POST, returning a data on success or error on fail
 *
 * @param {string} url
 * @param {object} {...data} params to send along with request
 * @returns {any}
 */
async function _post(url, params = {}, token = true, extraHeaders = {}) {
  try {
    const instance = getAxiosInstance(token, extraHeaders);

    const response = await instance.post(`${API_URL}${url}`, params);
    // check if success or throw error

    // Sentry.captureException(`${url} :  ${JSON.stringify(response)}`);
    isSuccess(response);

    return response.data;
  } catch (err) {
    handleErros(err);
  }
}

/**
 * Requests a URL as POST with multipart , returning a data on success or error on fail
 *
 * @param {string} url
 * @param {object} {...data} params to send along with request
 * @returns {any}
 */
async function _post_multipart(url, data, token = true) {
  if (Platform.OS === 'web') {
    // if (Platform.OS === 'web' || Platform.OS === 'android') {
    try {
      const instance = getAxiosInstance(token, {
        'Content-Type': 'multipart/form-data'
      });
      // return fetch(`${API_URL}${url}`, {
      //   method: 'POST',
      //   headers: {
      //     Authorization: 'Bearer ' + store.getState().user.access_token,
      //     lang:
      //       store.getState().language.local === 'ar'
      //         ? store.getState().language.local
      //         : 'en'
      //     // 'Content-Type': 'multipart/form-data',
      //     // Accept: 'application/json'
      //     // Accept: 'text/html'
      //   },
      //   // body: JSON.stringify(params.data)
      //   body: data
      // })
      //   .then(function(response) {
      //     console.log('www', response);
      //     return response.json();
      //   })
      //   .then(function(json) {
      //     console.log('ss', json);
      //     //console.log('-- End Request (register) --');
      //     return json;
      //   })
      //   .catch(error => {
      //     console.log('ee', error);
      //     return error;
      //   });

      const response = await instance.post(`${API_URL}${url}`, data);
      // check if success or throw error
      isSuccess(response);

      return response.data;
    } catch (err) {
      handleErros(err);
    }
  } else {
    // console.log('dataaaaa', data);
    try {
      const response = await RNFetchBlob.fetch(
        'POST',
        `${API_URL}${url}`,
        {
          Authorization: 'Bearer ' + store.getState().user.access_token,
          lang:
            store.getState().language.local === 'ar'
              ? store.getState().language.local
              : 'en',
          Accept: 'application/json'
          // 'Content-Type': 'multipart/form-data'
        },
        data
        // [{ name: 'name', data: 'user' }]
      );

      const res = response.json();

      // console.log('ddd', res);

      // check if success or throw error
      isSuccess(res);

      return res;
    } catch (err) {
      handleErros(err);
    }
  }
}

/**
 * Requests a URL as PUT, returning a data on success or error on fail
 *
 * @param {string} url
 * @param {object} {...data} params to send along with request
 * @returns {any}
 */
async function _put(url, params = {}, token = true) {
  try {
    const instance = getAxiosInstance(token);

    const response = await instance.put(`${API_URL}${url}`, params);

    // check if success or throw error
    isSuccess(response);
    return response.data;
  } catch (err) {
    handleErros(err);
  }
}

/**
 * Requests a URL as DELETE, returning a data on success or error on fail
 *
 * @param {string} url
 * @param {object} [params={...data}]  params to send along with request
 * @returns {any}
 */
async function _delete(url, params = {}, token = true) {
  try {
    const instance = getAxiosInstance(token);

    const response = await instance.delete(`${API_URL}${url}`, params);

    // check if success or throw error
    isSuccess(response);

    return response.data;
  } catch (err) {
    handleErros(err);
  }
}

function getAxiosInstance(token = true, extraHeaders = {}) {
  const instance = axios.create({
    baseURL: `${API_URL}`,
    // timeout: 1000,
    headers: token
      ? {
          Authorization: 'Bearer ' + store.getState().user.access_token,
          lang:
            store.getState().language.local === 'ar'
              ? store.getState().language.local
              : 'en',
          ...extraHeaders
        }
      : { ...extraHeaders }
  });
  return instance;
}

export { request, _get, _post, _put, _delete, _post_multipart };
