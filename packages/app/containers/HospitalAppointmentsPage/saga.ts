import { take, call, put, select, fork } from 'redux-saga/effects';
import {
  LOAD_APPOINTMENTS_LIST,
  loadAppointmentsListSuccess,
  loadAppointmentsListError,
  APPROVE_APPOINTMENT,
  approveAppointmentSuccess,
  approveAppointmentError,
  DELETE_APPOINTMENT,
  deleteAppointmentSuccess,
  deleteAppointmentError,
  noAppointmentExist
} from './ducks';
import API from '../../utils/api';
import { makeSelectUser } from '../User/ducks';

/**
 * Load hospitalAppointmentsPage saga
 */
export function* loadAppointmentsListSaga() {
  while (true) {
    const { api_key } = yield take(LOAD_APPOINTMENTS_LIST);
    try {
      const response = yield call(API.getListappointments, api_key);
      if (response && response.status === 'success') {
        yield put(loadAppointmentsListSuccess(response.Result));
        yield put(noAppointmentExist(''));
      }
    } catch (error) {
      if (error.message == 'no appointment exist') {
        yield put(noAppointmentExist(error.message));
        yield put(loadAppointmentsListSuccess([]));
      } else {
        yield put(loadAppointmentsListError(error.message));
        yield put(noAppointmentExist(''));
      }
    }
  }
}

export function* approveAppointmentSaga() {
  while (true) {
    const { appointment_id } = yield take(APPROVE_APPOINTMENT);
    const user = yield select(makeSelectUser());
    try {
      const response = yield call(API.postApproveAppointment, {
        appointment_id: appointment_id,
        api_key: user.api_key
      });
      if (response && response.status === 'success') {
        yield put(approveAppointmentSuccess());
      }
    } catch (error) {
      yield put(approveAppointmentError(error.message));
    }
  }
}

export function* deleteAppointmentSaga() {
  while (true) {
    const { appointment_id } = yield take(DELETE_APPOINTMENT);
    const user = yield select(makeSelectUser());
    try {
      const response = yield call(API.postDeleteAppointment, {
        appointment_id: appointment_id,
        api_key: user.api_key
      });
      if (response && response.status === 'success') {
        yield put(deleteAppointmentSuccess());
      }
    } catch (error) {
      yield put(deleteAppointmentError(error.message));
    }
  }
}

// Individual exports for testing
export default function* HospitalAppointmentsPageSaga() {
  yield fork(loadAppointmentsListSaga);
  yield fork(approveAppointmentSaga);
  yield fork(deleteAppointmentSaga);
}
