import { createSelector } from 'reselect';
import produce from 'immer';
import {
  initialStateNearHospitalPageType,
  NearHospitalPageActionTypes
} from './types';

/*
 *
 * NearHospitalPage constants
 *
 */
export const LOAD_NEAR_HOSPITAL = 'app/NearHospitalPage/LOAD_NEAR_HOSPITAL';
export const LOAD_NEAR_HOSPITAL_SUCCESS =
  'app/NearHospitalPage/LOAD_NEAR_HOSPITAL_SUCCESS';
export const LOAD_NEAR_HOSPITAL_ERROR =
  'app/NearHospitalPage/LOAD_NEAR_HOSPITAL_ERROR';

/*
 *
 * NearHospitalPage reducer
 *
 */
export const initialState: initialStateNearHospitalPageType = {
  data: [],
  error: '',
  loaded: false,
  loading: false
};

export default (state = initialState, action: NearHospitalPageActionTypes) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_NEAR_HOSPITAL:
        draft.loading = true;
        break;
      case LOAD_NEAR_HOSPITAL_SUCCESS:
        draft.loading = false;
        draft.loaded = true;
        draft.data = action.data;
        break;
      case LOAD_NEAR_HOSPITAL_ERROR:
        draft.loading = false;
        break;
    }
  });

/**
 * Direct selector to the nearHospitalPage state domain
 */
const selectNearHospitalPageDomain = state =>
  state.nearHospital || initialState;

/**
 * Default selector used by NearHospitalPage
 */
export const makeSelectNearHospitalPage = () =>
  createSelector(
    selectNearHospitalPageDomain,
    substate => substate
  );

/*
 *
 * NearHospitalPage actions
 *
 */
export function loadNearHospital(
  lat_long: string,
  limit: number,
  offset: number
): NearHospitalPageActionTypes {
  return {
    type: LOAD_NEAR_HOSPITAL,
    lat_long,
    limit,
    offset
  };
}
export function loadNearHospitalSuccess(
  data: any
): NearHospitalPageActionTypes {
  return {
    type: LOAD_NEAR_HOSPITAL_SUCCESS,
    data
  };
}
export function loadNearHospitalError(
  message: string
): NearHospitalPageActionTypes {
  return {
    type: LOAD_NEAR_HOSPITAL_ERROR,
    message
  };
}
