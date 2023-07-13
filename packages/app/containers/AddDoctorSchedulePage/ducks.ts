import { createSelector } from 'reselect';
import produce from 'immer';
import {
  initialStateAddDoctorSchedulePageType,
  AddDoctorSchedulePageActionTypes
} from './types';

/*
 *
 * AddDoctorSchedulePage constants
 *
 */
// export const DEFAULT_ACTION = 'app/AddDoctorSchedulePage/DEFAULT_ACTION';
// export const UPDATE_ACTION = 'app/AddDoctorSchedulePage/UPDATE_ACTION';

export const SELECT_CHECKBOX = 'app/AddDoctorSchedulePage/SELECT_CHECKBOX';
export const UNSELECT_CHECKBOX = 'app/AddDoctorSchedulePage/UNSELECT_CHECKBOX';

export const LOAD_DOCTORS_LIST = 'app/AddDoctorSchedulePage/LOAD_DOCTORS_LIST';
export const LOAD_DOCTORS_LIST_SUCCESS =
  'app/AddDoctorSchedulePage/LOAD_DOCTORS_LIST_SUCCESS';
export const LOAD_DOCTORS_LIST_ERROR =
  'app/AddDoctorSchedulePage/LOAD_DOCTORS_LIST_ERROR';

export const CREATE_DOCTOR_SCHEDULE =
  'app/AddDoctorSchedulePage/CREATE_DOCTOR_SCHEDULE';
export const CREATE_DOCTOR_SCHEDULE_SUCCESS =
  'app/AddDoctorSchedulePage/CREATE_DOCTOR_SCHEDULE_SUCCESS';
export const CREATE_DOCTOR_SCHEDULE_ERROR =
  'app/AddDoctorSchedulePage/CREATE_DOCTOR_SCHEDULE_ERROR';

/*
 *
 * AddDoctorSchedulePage reducer
 *
 */
export const initialState: initialStateAddDoctorSchedulePageType = {
  selectedCheckedbox: [],
  doctorsData: [],
  error: '',
  loaded: false,
  loading: false
};

export default (
  state = initialState,
  action: AddDoctorSchedulePageActionTypes
) =>
  produce(state, draft => {
    switch (action.type) {
      // case DEFAULT_ACTION:
      //   break;
      // case UPDATE_ACTION:
      //   break;
      case LOAD_DOCTORS_LIST:
        draft.loading = true;
        draft.selectedCheckedbox = [];
        break;
      case LOAD_DOCTORS_LIST_SUCCESS:
        // draft.doctorsData = action.doctorsData;
        draft.doctorsData = action.doctorsData;
        draft.loading = false;
        break;
      case LOAD_DOCTORS_LIST_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case CREATE_DOCTOR_SCHEDULE:
        draft.loading = true;
        break;
      case CREATE_DOCTOR_SCHEDULE_SUCCESS:
        draft.loading = false;
        break;
      case CREATE_DOCTOR_SCHEDULE_ERROR:
        draft.loading = false;
        break;

      case SELECT_CHECKBOX:
        draft.selectedCheckedbox.push(action.values);
        break;
      case UNSELECT_CHECKBOX:
        draft.selectedCheckedbox.splice(
          draft.selectedCheckedbox.findIndex(
            checkedbox => checkedbox.value === action.values.value
          ),
          1
        );
        break;
    }
  });

/**
 * Direct selector to the addDoctorSchedulePage state domain
 */
const selectAddDoctorSchedulePageDomain = state =>
  state.AddDoctorSchedule || initialState;

/**
 * Default selector used by AddDoctorSchedulePage
 */
export const makeSelectAddDoctorSchedulePage = () =>
  createSelector(
    selectAddDoctorSchedulePageDomain,
    substate => substate
  );

/*
 *
 * AddDoctorSchedulePage actions
 *
 */
// export function defaultAction():AddDoctorSchedulePageActionTypes {
//   return {
//     type: DEFAULT_ACTION,
//   };
// }
export function loadDoctorsList(api_key): AddDoctorSchedulePageActionTypes {
  return {
    type: LOAD_DOCTORS_LIST,
    api_key
  };
}
export function loadDoctorsListSuccess(
  doctorsData: Array<DoctorsDataType>
): AddDoctorSchedulePageActionTypes {
  return {
    type: LOAD_DOCTORS_LIST_SUCCESS,
    doctorsData
  };
}
export function loadDoctorsListError(
  error: string
): AddDoctorSchedulePageActionTypes {
  return {
    type: LOAD_DOCTORS_LIST_ERROR,
    error
  };
}

export function createDoctorSchedule(
  data,
  action
): AddDoctorSchedulePageActionTypes {
  return {
    type: CREATE_DOCTOR_SCHEDULE,
    data,
    action
  };
}
export function createDoctorScheduleSuccess(): AddDoctorSchedulePageActionTypes {
  // doctorsData: Array<DoctorsDataType>
  return {
    type: CREATE_DOCTOR_SCHEDULE_SUCCESS
  };
}
export function createDoctorScheduleError(
  error: string
): AddDoctorSchedulePageActionTypes {
  return {
    type: CREATE_DOCTOR_SCHEDULE_ERROR,
    error
  };
}

export function selectCheckbox(values): AddDoctorSchedulePageActionTypes {
  return {
    type: SELECT_CHECKBOX,
    values
  };
}
export function unselectCheckbox(values): AddDoctorSchedulePageActionTypes {
  return {
    type: UNSELECT_CHECKBOX,
    values
  };
}
