import { take, call, put, select, fork } from 'redux-saga/effects';
import {
  LOAD_DOCTORS_SCHEDULES,
  loadDoctorsSchedulesSuccess,
  loadDoctorsSchedulesError,
  CREATE_SCHEDULE,
  createScheduleSuccess,
  createScheduleError,
  makeSelectHospitalDoctorsSchedulePage,
  deleteScheduleSuccess,
  deleteScheduleError,
  DELETE_SCHEDULE
} from './ducks';
import API from '../../utils/api';
import { showSnackbar } from '../Snackbar/ducks';
import { push } from 'connected-react-router';
import moment from 'moment';

/**
 * Load hospitalDoctorsSchedulePage saga
 */
export function* rootHospitalDoctorsSchedulePageSaga() {
  while (true) {
    const { api_key } = yield take(LOAD_DOCTORS_SCHEDULES);
    try {
      const response = yield call(API.getDoctorsSchedules, api_key);
      if (response && response.status === 'success') {
        yield put(loadDoctorsSchedulesSuccess(response.Result));
      }
    } catch (error) {
      yield put(loadDoctorsSchedulesError(error.message));
    }
  }
}

export function* createScheduleSaga() {
  while (true) {
    yield take(CREATE_SCHEDULE);
    const hospitalDoctorsSchedule = yield select(
      makeSelectHospitalDoctorsSchedulePage()
    );

    try {
      const response = yield call(API.postAddschedule, {
        doctor_id: hospitalDoctorsSchedule.schedule[0],
        start_date: hospitalDoctorsSchedule.schedule[1],
        end_date: hospitalDoctorsSchedule.schedule[1],
        api_key: hospitalDoctorsSchedule.schedule[2],
        time: moment(hospitalDoctorsSchedule.schedule[4]).format('hh:mm A')
      });
      if (response && response.status === 'success') {
        yield put(showSnackbar(response.Result));
        yield put(createScheduleSuccess());
      }
    } catch (error) {
      yield put(showSnackbar(error.message));
      yield put(createScheduleError(error.message));
    }
  }
}

export function* deleteScheduleSaga() {
  while (true) {
    const { data } = yield take(DELETE_SCHEDULE);
    try {
      const response = yield call(API.postDeleteSchedule, data);
      if (response && response.status === 'success') {
        yield put(showSnackbar(response.Result));
        yield put(deleteScheduleSuccess());
      }
    } catch (error) {
      yield put(showSnackbar(error.message));
      yield put(deleteScheduleError(error.message));
    }
  }
}

// Individual exports for testing
export default function* HospitalDoctorsSchedulePageSaga() {
  yield fork(rootHospitalDoctorsSchedulePageSaga);
  yield fork(createScheduleSaga);
  yield fork(deleteScheduleSaga);
}
