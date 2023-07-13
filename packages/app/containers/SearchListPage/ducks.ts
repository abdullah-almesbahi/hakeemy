import { createSelector } from 'reselect';
import produce from 'immer';
import {
  initialStateSearchListPageType,
  SearchListPageActionTypes
} from './types';
import { CHECKER_INPUTS_HOSPITAL_BY_NAME_SUCCESS } from '../SearchDoctorPage/ducks';

/*
 *
 * SearchListPage constants
 *
 */
export const LOAD_SEARCH_LIST = 'app/SearchListPage/LOAD_SEARCH_LIST';
export const LOAD_SEARCH_LIST_SUCCESS =
  'app/SearchListPage/LOAD_SEARCH_LIST_SUCCESS';
export const LOAD_SEARCH_LIST_ERROR =
  'app/SearchListPage/LOAD_SEARCH_LIST_ERROR';

export const LOAD_NEARBY_HOSPITALS = 'app/SearchListPage/LOAD_NEARBY_HOSPITALS';
export const LOAD_NEARBY_HOSPITALS_SUCCESS =
  'app/SearchListPage/LOAD_NEARBY_HOSPITALS_SUCCESS';
export const LOAD_NEARBY_HOSPITALS_ERROR =
  'app/SearchListPage/LOAD_NEARBY_HOSPITALS_ERROR';

/*
 *
 * SearchListPage reducer
 *
 */
export const initialState: initialStateSearchListPageType = {
  data: [],
  hospitalIds: [],
  error: '',
  loaded: false,
  loading: false
};

export default (state = initialState, action: SearchListPageActionTypes) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_SEARCH_LIST:
        // draft.data = action.data.selected.filter(
        //   d => d.country_id === action.country_id,
        //   d.city_id === action.city_id,
        //   d.insurance_id === action.insurance_id
        // );
        draft.loading = true;
        draft.error = '';
        break;
      case LOAD_SEARCH_LIST_SUCCESS:
        draft.data = action.data;
        draft.loading = false;
        break;
      case LOAD_SEARCH_LIST_ERROR:
        draft.data = [];
        draft.error = action.error;
        draft.loading = false;
        break;

      case LOAD_NEARBY_HOSPITALS:
        draft.loading = true;
        draft.data = [];
        break;
      case LOAD_NEARBY_HOSPITALS_SUCCESS:
        draft.loading = false;
        draft.loaded = true;
        draft.hospitalIds = action.data;
        break;
      case LOAD_NEARBY_HOSPITALS_ERROR:
        draft.loading = false;
        break;
    }
  });

/**
 * Direct selector to the searchListPage state domain
 */
const selectSearchListPageDomain = state => state.searchList || initialState;

/**
 * Default selector used by SearchListPage
 */
export const makeSelectSearchListPage = () =>
  createSelector(
    selectSearchListPageDomain,
    substate => substate
  );

/*
 *
 * SearchListPage actions
 *
 */
export function loadSearchList(data): SearchListPageActionTypes {
  return {
    type: LOAD_SEARCH_LIST,
    data
  };
}
export function loadSearchListSuccess(data): SearchListPageActionTypes {
  return {
    type: LOAD_SEARCH_LIST_SUCCESS,
    data
  };
}
export function loadSearchListError(error: string): SearchListPageActionTypes {
  return {
    type: LOAD_SEARCH_LIST_ERROR,
    error
  };
}

export function loadNearbyHospitals(
  lat_long: string,
  limit: number,
  offset: number
): SearchListPageActionTypes {
  return {
    type: LOAD_NEARBY_HOSPITALS,
    lat_long,
    limit,
    offset
  };
}
export function loadNearbyHospitalsSuccess(
  data: any
): SearchListPageActionTypes {
  return {
    type: LOAD_NEARBY_HOSPITALS_SUCCESS,
    data
  };
}
export function loadNearbyHospitalsError(
  message: string
): SearchListPageActionTypes {
  return {
    type: LOAD_NEARBY_HOSPITALS_ERROR,
    message
  };
}
