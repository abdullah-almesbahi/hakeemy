import { take, call, put, select, fork } from 'redux-saga/effects';
// import {
// DEFAULT_ACTION,
// UPDATE_ACTION
// } from "./ducks";
import API from '../../utils/api';
import {
  LOAD_DOCTORS_LIST,
  loadDoctorsListSuccess,
  loadDoctorsListError,
  CREATE_DOCTOR_SCHEDULE,
  createDoctorScheduleSuccess,
  createDoctorScheduleError
} from './ducks';
import { showSnackbar } from '../Snackbar/ducks';
import moment from 'moment';
import { ROUTE_HOSPITAL_SCHEDULES } from '../../utils/constants';
import { push } from 'connected-react-router';
import { I18nManager } from 'react-native';
import { getLocalizeRoute } from '../../utils/helper';

/**
 * Load addDoctorSchedulePage saga
 */
export function* rootAddDoctorSchedulePageSaga() {
  while (true) {
    const { api_key } = yield take(LOAD_DOCTORS_LIST);
    // console.log('staaaart');

    try {
      const response = yield call(API.getListOfDoctorsForHospital, api_key);
      // console.log('calledddd');
      if (response && response.status === 'success') {
        // console.log('responsed');
        // yield put(showSnackbar(response.Result));
        yield put(loadDoctorsListSuccess(response.Result));
      }
    } catch (error) {
      // console.log('VVVVVVVVVVVVVVVVVVVVVVVV');
      yield put(showSnackbar(error.message));
      yield put(loadDoctorsListError(error.message));
    }
  }
}

/**
 * update createDoctorSchedule saga
 */

export function* createDoctorSchedulePageSaga() {
  while (true) {
    const { data, action } = yield take(CREATE_DOCTOR_SCHEDULE);
    try {
      const response = yield call(API.postAddschedule, {
        doctor_id: data.doctors.join(', '),
        start_date: data.date,
        end_date: data.date,
        time: data.time.join(', '),
        api_key: data.api_key
      });
      if (response && response.status === 'success') {
        yield put(
          showSnackbar(
            I18nManager.isRTL ? response.result_arabic : response.Result
          )
        );
        yield put(createDoctorScheduleSuccess());
        yield put(push(getLocalizeRoute(ROUTE_HOSPITAL_SCHEDULES)));
      }
    } catch (error) {
      yield put(showSnackbar(error.message));
      yield put(createDoctorScheduleError(error.message));
    }
  }
}

// Individual exports for testing
export default function* AddDoctorSchedulePageSaga() {
  yield fork(rootAddDoctorSchedulePageSaga);
  yield fork(createDoctorSchedulePageSaga);
}
