import { createSelector } from 'reselect';
import produce from 'immer';
import {
  initialStateLocationPageType,
  LocationPageActionTypes,
  LocationDataType,
  UpdateLocationDataType,
  SuggestDataType
} from './types';

/*
 *
 * LocationPage constants
 *
 */
export const LOAD_LOCATION = 'app/LocationPage/LOAD_LOCATION';
export const LOAD_LOCATION_SUCCESS = 'app/LocationPage/LOAD_LOCATION_SUCCESS';
export const LOAD_LOCATION_ERROR = 'app/LocationPage/LOAD_LOCATION_ERROR';
export const UPDATE_LOCATION = 'app/LocationPage/UPDATE_LOCATION';
export const UPDATE_LOCATION_SUCCESS =
  'app/LocationPage/UPDATE_LOCATION_SUCCESS';
export const UPDATE_LOCATION_ERROR = 'app/LocationPage/UPDATE_LOCATION_ERROR';
export const SUGGEST_LOCATION = 'app/LocationPage/SUGGEST_LOCATION';
export const SUGGEST_LOCATION_SUCCESS =
  'app/LocationPage/SUGGEST_LOCATION_SUCCESS';
export const SUGGEST_LOCATION_ERROR = 'app/LocationPage/SUGGEST_LOCATION_ERROR';
export const UPDATE_LOCATION_OPTION = 'app/LocationPage/UPDATE_LOCATION_OPTION';

/*
 *
 * LocationPage reducer
 *
 */
export const initialStateLocation: initialStateLocationPageType = {
  data: {
    user_location_id: 0,
    user_id: 0,
    address: '',
    country_name: '',
    city: '',
    postal_code: 0,
    latitude: 0,
    longitude: 0,
    user_km_range: 0,
    gender: ''
  },
  suggest: [],
  showSuggest: false,
  error: '',
  loaded: false,
  loading: true
};

export default (
  state = initialStateLocation,
  action: LocationPageActionTypes
) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_LOCATION:
        draft.loading = true;
        draft.error = '';
        break;
      case LOAD_LOCATION_SUCCESS:
        draft.data.user_location_id = action.data.user_location_id
          ? action.data.user_location_id
          : state.data.user_location_id;
        draft.data.user_id = action.data.user_id
          ? action.data.user_id
          : state.data.user_id;
        draft.data.address = action.data.address
          ? action.data.address
          : state.data.address;
        draft.data.country_name = action.data.country_name
          ? action.data.country_name
          : state.data.country_name;
        draft.data.city = action.data.city ? action.data.city : state.data.city;
        draft.data.postal_code = action.data.postal_code
          ? action.data.postal_code
          : state.data.postal_code;
        draft.data.latitude =
          action.data.latitude !== undefined
            ? action.data.latitude
            : state.data.latitude;
        draft.data.longitude =
          action.data.longitude !== undefined
            ? action.data.longitude
            : state.data.longitude;
        draft.data.user_km_range = action.data.user_km_range
          ? action.data.user_km_range
          : state.data.user_km_range;
        draft.data.gender = action.data.gender
          ? action.data.gender
          : state.data.gender;

        draft.loading = false;
        draft.loaded = true;
        break;
      case LOAD_LOCATION_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case UPDATE_LOCATION:
        draft.loading = true;
        draft.error = '';
        break;
      case UPDATE_LOCATION_SUCCESS:
        // draft.data = action.data;
        draft.loading = false;
        draft.loaded = true;
        break;
      case UPDATE_LOCATION_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case SUGGEST_LOCATION:
        // draft.loading = true;
        // draft.error = '';
        break;
      case SUGGEST_LOCATION_SUCCESS:
        draft.suggest = action.data;
        if (action.data.length > 0) {
          draft.showSuggest = true;
        }
        // draft.loading = false;
        // draft.loaded = true;
        break;
      case SUGGEST_LOCATION_ERROR:
        // draft.error = action.error;
        // draft.loading = false;
        break;
      case UPDATE_LOCATION_OPTION:
        // @ts-ignore
        draft[action.key] = action.value;
        draft.loading = false;
        break;
    }
  });

/**
 * Direct selector to the locationPage state domain
 */
const selectLocationPageDomain = (state: any) =>
  state.location || initialStateLocation;

/**
 * Default selector used by LocationPage
 */
export const makeSelectLocationPage = () =>
  createSelector(
    selectLocationPageDomain,
    substate => substate
  );

/*
 *
 * LocationPage actions
 *
 */
export function loadLocation(): LocationPageActionTypes {
  return {
    type: LOAD_LOCATION
  };
}

/**
 * Dispatch when saga load location success
 *
 * @param {LocationDataType} data
 * @returns {LocationPageActionTypes}
 */
export function loadLocationSuccess(
  data: LocationDataType
): LocationPageActionTypes {
  return {
    type: LOAD_LOCATION_SUCCESS,
    data
  };
}

/**
 * Dispatch when saga load location failed
 *
 * @export
 * @param {string} error
 * @returns {LocationPageActionTypes}
 */
export function loadLocationError(error: string): LocationPageActionTypes {
  return {
    type: LOAD_LOCATION_ERROR,
    error
  };
}

export function updateLocation(
  data: UpdateLocationDataType
): LocationPageActionTypes {
  return {
    type: UPDATE_LOCATION,
    data
  };
}

/**
 * Dispatch when saga update location success
 *
 * @returns {LocationPageActionTypes}
 */
export function updateLocationSuccess(): LocationPageActionTypes {
  return {
    type: UPDATE_LOCATION_SUCCESS
  };
}

/**
 * Dispatch when saga update location failed
 *
 * @export
 * @param {string} error
 * @returns {LocationPageActionTypes}
 */
export function updateLocationError(error: string): LocationPageActionTypes {
  return {
    type: UPDATE_LOCATION_ERROR,
    error
  };
}

export function suggestLocation(text: string): LocationPageActionTypes {
  return {
    type: SUGGEST_LOCATION,
    text
  };
}

/**
 * Dispatch when saga suggest location success
 *
 * @param {object} data
 * @returns {LocationPageActionTypes}
 */
export function suggestLocationSuccess(
  data: Array<SuggestDataType>
): LocationPageActionTypes {
  return {
    type: SUGGEST_LOCATION_SUCCESS,
    data
  };
}

/**
 * Dispatch when saga suggest location failed
 *
 * @export
 * @param {string} error
 * @returns {LocationPageActionTypes}
 */
export function suggestLocationError(error: string): LocationPageActionTypes {
  return {
    type: SUGGEST_LOCATION_ERROR,
    error
  };
}

export function updateLocationOption(
  key: any,
  value: any
): LocationPageActionTypes {
  return {
    type: UPDATE_LOCATION_OPTION,
    key,
    value
  };
}
