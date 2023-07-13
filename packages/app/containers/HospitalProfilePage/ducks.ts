import { createSelector } from 'reselect';
import produce from 'immer';
import {
  initialStateHospitalProfilePageType,
  HospitalProfilePageActionTypes
} from './types';

/*
 *
 * HospitalProfilePage constants
 *
 */
export const LOAD_HOSPITAL_PROFILE =
  'app/HospitalProfilePage/LOAD_HOSPITAL_PROFILE';
export const LOAD_HOSPITAL_PROFILE_SUCCESS =
  'app/HospitalProfilePage/LOAD_HOSPITAL_PROFILE_SUCCESS';
export const LOAD_HOSPITAL_PROFILE_ERROR =
  'app/HospitalProfilePage/LOAD_HOSPITAL_PROFILE_ERROR';

/*
 *
 * HospitalProfilePage reducer
 *
 */
export const initialState: initialStateHospitalProfilePageType = {
  data: {},
  error: '',
  loaded: false,
  loading: false
};

export default (state = initialState, action: HospitalProfilePageActionTypes) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_HOSPITAL_PROFILE:
        return { ...initialState, loading: true };
        break;
      case LOAD_HOSPITAL_PROFILE_SUCCESS:
        draft.data = action.data;
        draft.loading = false;
        break;
      case LOAD_HOSPITAL_PROFILE_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

/**
 * Direct selector to the hospitalProfilePage state domain
 */
const selectHospitalProfilePageDomain = state =>
  state.hospitalProfile || initialState;

/**
 * Default selector used by HospitalProfilePage
 */
export const makeSelectHospitalProfilePage = () =>
  createSelector(
    selectHospitalProfilePageDomain,
    substate => substate
  );

/*
 *
 * HospitalProfilePage actions
 *
 */
export function loadHospitalProfile(
  id: number
): HospitalProfilePageActionTypes {
  return {
    type: LOAD_HOSPITAL_PROFILE,
    id
  };
}
export function loadHospitalProfileSuccess(
  data
): HospitalProfilePageActionTypes {
  return {
    type: LOAD_HOSPITAL_PROFILE_SUCCESS,
    data
  };
}
export function loadHospitalProfileError(
  error: string
): HospitalProfilePageActionTypes {
  return {
    type: LOAD_HOSPITAL_PROFILE_ERROR,
    error
  };
}
