import { take, call, put, select, fork } from 'redux-saga/effects';
import {
  LOAD_COUNTRY_LIST,
  loadCountryListSuccess,
  loadCountryListError,
  LOAD_CITIES_LIST,
  loadCitiesListSuccess,
  loadCitiesListError,
  loadInsurancesListSuccess,
  loadInsurancesListError,
  LOAD_INSURANCES_LIST,
  CREATE_NEW_HOSPITAL,
  createNewHospitalSuccess,
  HOSPITAL_UPDATE,
  hospitalUpdateSuccess,
  loadInsurancesList,
  loadCitiesList,
  makeSelectHospitalRegistrationPage,
  makeEnable
} from './ducks';
import API from '../../utils/api';
import color from '@material-ui/core/colors/brown';
import { showSnackbar } from '../Snackbar/ducks';
import { ROUTE_HOSPITAL_LOGIN } from '../../utils/constants';
import { push } from 'connected-react-router';
import { NativeModules } from 'react-native';
import { setUser, makeSelectUserId, makeSelectUser } from '../User/ducks';
import { store } from '../../App';
import Sentry from '../../components/Sentry';
import _has from 'lodash/has';
import { getLocalizeRoute } from '../../utils/helper';

/**
 * Load hospitalRegistrationPage saga
 */
export function* rootHospitalRegistrationPageSaga() {
  while (true) {
    yield take(LOAD_COUNTRY_LIST);
    try {
      const response = yield call(API.getCountry);
      if (response && response.status === 'success') {
        yield put(loadCountryListSuccess(response.Result));
        // TODO: Selected country should be dynamic
        yield put(loadCitiesList(2));
        yield put(loadInsurancesList(2));
      }
    } catch (error) {
      yield put(loadCountryListError(error.message));
    }
  }
}

export function* loadCitiesSaga() {
  while (true) {
    const { country } = yield take(LOAD_CITIES_LIST);
    try {
      const response = yield call(API.getCity);
      if (response && response.status === 'success') {
        yield put(loadCitiesListSuccess(response.Result, country));
      }
    } catch (error) {
      yield put(loadCitiesListError(error.message));
    }
  }
}

export function* loadInsurancesSaga() {
  while (true) {
    const { country } = yield take(LOAD_INSURANCES_LIST);
    try {
      const response = yield call(API.getInsurance);
      if (response && response.status === 'success') {
        yield put(loadInsurancesListSuccess(response.Result, country));
      }
    } catch (error) {
      yield put(loadInsurancesListError(error.message));
    }
  }
}

export function* createNewHospitalSaga() {
  while (true) {
    const { data, action } = yield take(CREATE_NEW_HOSPITAL);
    const userId = yield select(makeSelectUserId());
    const user = yield select(makeSelectUser());
    const hospitalReagistrationPage = yield select(
      makeSelectHospitalRegistrationPage()
    );
    let lang = store.getState().language.locale;

    if (userId < 1) {
      try {
        const response = yield call(API.postHospitalRegister, data);
        if (response && response.status === 'success') {
          yield put(createNewHospitalSuccess());
          yield put(
            showSnackbar(
              lang === 'ar' ? response.result_arabic : response.Result
            )
          );
          yield put(push(getLocalizeRoute(ROUTE_HOSPITAL_LOGIN)));
        }
      } catch (error) {
        yield call(action.setErrors, { email: error.message });
        yield put(showSnackbar(error.message));
        yield call(action.setSubmitting, false);
      }
    } else if (userId > 0) {
      let filteredInsurances = [];
      const insurances = hospitalReagistrationPage.insurancesData;
      const _filter = hospitalReagistrationPage.selectedCheckedbox;
      for (var p in insurances) {
        for (var filter in _filter) {
          if (insurances[p].id == _filter[filter].value) {
            filteredInsurances.push({
              id: insurances[p].id,
              insurance: insurances[p].insurance,
              insurance_arabic: insurances[p].insurance_arabic
            });
          }
        }
      }
      try {
        const response = yield call(API.postHospitalUpdate, {
          // ...data,
          api_key: user.api_key,
          type: data[0].data,
          email: data[1].data,
          // password: data[2].data,
          // repeatPassword: data[3].data,
          hospital_name: data[4].data,
          arabic_name: data[5].data,
          // country: data[6].data,
          city: data[7].data,
          hospital_insurance: data[8].data,
          phone: data[9].data,
          address: data[10].data,
          address_arabic: data[11].data,
          location: data[12].data,
          latLong: data[13].data
          // hospitalPictuerLogo: data.hospitalPictuerLogo,
        });
        if (response && response.status === 'success') {
          yield put(hospitalUpdateSuccess());
          yield put(showSnackbar(response.Result));
          yield put(
            setUser({
              ...user,
              type: data[0].data,
              email: data[1].data,
              hospital: data[4].data,
              hospital_arabic: data[5].data,
              city_id: data[7].data,
              insurance: filteredInsurances,
              phone: data[9].data,
              address: data[10].data,
              address_arabic: data[11].data,
              location: data[12].data,
              latitude: data[14].data,
              longitude: data[15].data
            })
          );
          yield put(makeEnable());
        }
      } catch (error) {
        yield put(showSnackbar(error.message));
        yield call(action.setErrors, { email: error.message });
        yield call(action.setSubmitting, false);
        // yield call(actions.setErrors, error.message);
      }
    }
  }
}

// export function* hospitalUpdateSaga() {
//   while (true) {
//     const { data, actions } = yield take(HOSPITAL_UPDATE);
//     try {
//       {
//         console.log('start api', data);
//       }
//       const response = yield call(API.postHospitalUpdate, {
//         api_key: data.api_key,
//         type: data.type,
//         email: data.email,
//         hospital_name: data.hospital,
//         arabic_name: data.hospital_arabic,
//         city: data.city,
//         // city
//         // insurances
//         address: data.address,
//         phone: data.PhoneMobile
//         // location: data.location ,
//         // hospitalPictuerLogo: data.hospitalPictuerLogo
//         // address_arabic: data.addressArabic
//       });
//       if (response && response.status === 'success') {
//         console.log('api succes');
//         yield put(hospitalUpdateSuccess());
//         yield put(showSnackbar(response.Result));
//         yield put(setUser(response.response));
//       }
//     } catch (error) {
//       yield put(showSnackbar(error.message));
//       yield call(actions.setErrors, { email: error.message });
//       yield call(actions.setSubmitting, false);
//       // yield call(actions.setErrors, error.message);
//     }
//   }
// }

export default function* HospitalRegistrationPageSaga() {
  yield fork(rootHospitalRegistrationPageSaga);
  yield fork(loadCitiesSaga);
  yield fork(loadInsurancesSaga);
  yield fork(createNewHospitalSaga);
  // yield fork(hospitalUpdateSaga);
}
