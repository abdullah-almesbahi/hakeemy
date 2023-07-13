import { createSelector } from 'reselect';
import produce from 'immer';
import {
  initialStateHospitalDoctorsSchedulePageType,
  HospitalDoctorsSchedulePageActionTypes
} from './types';

/*
 *
 * HospitalDoctorsSchedulePage constants
 *
 */
export const LOAD_DOCTORS_SCHEDULES =
  'app/HospitalDoctorsSchedulePage/LOAD_DOCTORS_SCHEDULES';
export const LOAD_DOCTORS_SCHEDULES_SUCCESS =
  'app/HospitalDoctorsSchedulePage/LOAD_DOCTORS_SCHEDULES_SUCCESS';
export const LOAD_DOCTORS_SCHEDULES_ERROR =
  'app/HospitalDoctorsSchedulePage/LOAD_DOCTORS_SCHEDULES_ERROR';

export const SCHEDULE = 'app/HospitalDoctorsSchedulePage/SCHEDULE';
export const TIMES = 'app/HospitalDoctorsSchedulePage/TIMES';

export const CREATE_SCHEDULE =
  'app/HospitalDoctorsSchedulePage/CREATE_SCHEDULE';
export const CREATE_SCHEDULE_SUCCESS =
  'app/HospitalDoctorsSchedulePage/CREATE_SCHEDULE_SUCCESS';
export const CREATE_SCHEDULE_ERROR =
  'app/HospitalDoctorsSchedulePage/CREATE_SCHEDULE_ERROR';

export const DELETE_SCHEDULE =
  'app/HospitalDoctorsSchedulePage/DELETE_SCHEDULE';
export const DELETE_SCHEDULE_SUCCESS =
  'app/HospitalDoctorsSchedulePage/DELETE_SCHEDULE_SUCCESS';
export const DELETE_SCHEDULE_ERROR =
  'app/HospitalDoctorsSchedulePage/DELETE_SCHEDULE_ERROR';

/*
 *
 * HospitalDoctorsSchedulePage reducer
 *
 */
export const initialState: initialStateHospitalDoctorsSchedulePageType = {
  data: [],
  schedule: [],
  error: '',
  reload: 0,
  loaded: false,
  loading: false
};

export default (
  state = initialState,
  action: HospitalDoctorsSchedulePageActionTypes
) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_DOCTORS_SCHEDULES:
        draft.loading = true;
        break;
      case LOAD_DOCTORS_SCHEDULES_SUCCESS:
        draft.loading = false;
        draft.data = action.data;
        break;
      case LOAD_DOCTORS_SCHEDULES_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;

      case SCHEDULE:
        draft.schedule = action.data;
        break;
      case TIMES:
        draft.schedule[4] = action.timeSelected;
        break;

      case CREATE_SCHEDULE:
        draft.loading = true;
        break;
      case CREATE_SCHEDULE_SUCCESS:
        draft.reload = draft.reload + 1;
        // draft.loading = false;
        break;
      case CREATE_SCHEDULE_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;

      case DELETE_SCHEDULE:
        draft.loading = true;
        break;
      case DELETE_SCHEDULE_SUCCESS:
        draft.reload = draft.reload + 1;
        // draft.loading = false;
        break;
      case DELETE_SCHEDULE_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });

/**
 * Direct selector to the hospitalDoctorsSchedulePage state domain
 */
const selectHospitalDoctorsSchedulePageDomain = state =>
  state.hospitalDoctorsSchedulePage || initialState;

/**
 * Default selector used by HospitalDoctorsSchedulePage
 */

export const makeSelectHospitalDoctorsSchedulePage = () =>
  createSelector(
    selectHospitalDoctorsSchedulePageDomain,
    substate => substate
  );

/*
 *
 * HospitalDoctorsSchedulePage actions
 *
 */
export function loadDoctorsSchedules(
  api_key
): HospitalDoctorsSchedulePageActionTypes {
  return {
    type: LOAD_DOCTORS_SCHEDULES,
    api_key
  };
}
export function loadDoctorsSchedulesSuccess(
  data
): HospitalDoctorsSchedulePageActionTypes {
  return {
    type: LOAD_DOCTORS_SCHEDULES_SUCCESS,
    data
  };
}
export function loadDoctorsSchedulesError(
  error
): HospitalDoctorsSchedulePageActionTypes {
  return {
    type: LOAD_DOCTORS_SCHEDULES_ERROR,
    error
  };
}

export function schedule(data): HospitalDoctorsSchedulePageActionTypes {
  return {
    type: SCHEDULE,
    data
  };
}
export function times(timeSelected): HospitalDoctorsSchedulePageActionTypes {
  return {
    type: TIMES,
    timeSelected
  };
}

export function createSchedule(): HospitalDoctorsSchedulePageActionTypes {
  return {
    type: CREATE_SCHEDULE
  };
}
export function createScheduleSuccess(): HospitalDoctorsSchedulePageActionTypes {
  return {
    type: CREATE_SCHEDULE_SUCCESS
  };
}
export function createScheduleError(
  error
): HospitalDoctorsSchedulePageActionTypes {
  return {
    type: CREATE_SCHEDULE_ERROR,
    error
  };
}

export function deleteSchedule(data): HospitalDoctorsSchedulePageActionTypes {
  return {
    type: DELETE_SCHEDULE,
    data
  };
}
export function deleteScheduleSuccess(): HospitalDoctorsSchedulePageActionTypes {
  return {
    type: DELETE_SCHEDULE_SUCCESS
  };
}
export function deleteScheduleError(
  error
): HospitalDoctorsSchedulePageActionTypes {
  return {
    type: DELETE_SCHEDULE_ERROR,
    error
  };
}
