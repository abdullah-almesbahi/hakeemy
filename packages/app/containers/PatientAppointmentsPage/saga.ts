import { take, call, put, select, fork } from 'redux-saga/effects';
import {
  LOAD_MY_APPOINTMENTS,
  loadMyAppointmentsSuccess,
  loadMyAppointmentsError
} from './ducks';
import API from '../../utils/api';

/**
 * Load myAppointmentsPage saga
 */
export function* loadMyAppointmentsSaga() {
  while (true) {
    const { api_key } = yield take(LOAD_MY_APPOINTMENTS);
    try {
      const response = yield call(API.getMyAppointments, api_key);
      if (response && response.status === 'success') {
        yield put(loadMyAppointmentsSuccess(response.Result));
      }
    } catch (error) {
      yield put(loadMyAppointmentsError(error.message));
    }
  }
}

// Individual exports for testing
export default function* MyAppointmentsPageSaga() {
  yield fork(loadMyAppointmentsSaga);
}
