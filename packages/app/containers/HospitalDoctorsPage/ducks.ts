import { createSelector } from 'reselect';
import produce from 'immer';
import {
  initialStateHospitalDoctorsPageType,
  HospitalDoctorsPageActionTypes
} from './types';

/*
 *
 * HospitalDoctorsPage constants
 *
 */
export const LOAD_DOCTORS_LIST = 'app/HospitalDoctorsPage/LOAD_DOCTORS_LIST';
export const LOAD_DOCTORS_LIST_SUCCESS =
  'app/HospitalDoctorsPage/LOAD_DOCTORS_LIST_SUCCESS';
export const LOAD_DOCTORS_LIST_ERROR =
  'app/HospitalDoctorsPage/LOAD_DOCTORS_LIST_ERROR';

/*
 *
 * HospitalDoctorsPage reducer
 *
 */
export const initialState: initialStateHospitalDoctorsPageType = {
  doctorsData: [],
  error: '',
  loaded: false,
  loading: false
};

export default (state = initialState, action: HospitalDoctorsPageActionTypes) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_DOCTORS_LIST:
        draft.doctorsData = [];
        draft.loading = true;
        break;
      case LOAD_DOCTORS_LIST_SUCCESS:
        draft.loading = false;
        draft.doctorsData = action.doctorsData;
        break;
      case LOAD_DOCTORS_LIST_ERROR:
        draft.doctorsData = [];
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

/**
 * Direct selector to the hospitalDoctorsPage state domain
 */
const selectHospitalDoctorsPageDomain = state =>
  state.hospitalDoctorPage || initialState;

/**
 * Default selector used by HospitalDoctorsPage
 */
export const makeSelectHospitalDoctorsPage = () =>
  createSelector(
    selectHospitalDoctorsPageDomain,
    substate => substate
  );

/*
 *
 * HospitalDoctorsPage actions
 *
 */
export function loadDoctorsList(api_key): HospitalDoctorsPageActionTypes {
  return {
    type: LOAD_DOCTORS_LIST,
    api_key
  };
}
export function loadDoctorsListSuccess(
  doctorsData: Array<DoctorsDataType>
): HospitalDoctorsPageActionTypes {
  return {
    type: LOAD_DOCTORS_LIST_SUCCESS,
    doctorsData
  };
}
export function loadDoctorsListError(
  error: string
): HospitalDoctorsPageActionTypes {
  return {
    type: LOAD_DOCTORS_LIST_ERROR,
    error
  };
}
