import { take, call, put, select, fork } from 'redux-saga/effects';
import {
  LOAD_HOSPITAL_PROFILE,
  loadHospitalProfileSuccess,
  loadHospitalProfileError
} from './ducks';
import API from '../../utils/api';

/**
 * Load  doctorProfilePage saga
 */
export function* rootHospitalProfilePageSaga() {
  while (true) {
    const { id } = yield take(LOAD_HOSPITAL_PROFILE);
    try {
      const response = yield call(API.getHospital, id);
      if (response && response.status === 'success') {
        yield put(loadHospitalProfileSuccess(response.Result));
      }
    } catch (error) {
      yield put(loadHospitalProfileError(error.message));
    }
  }
}

export default function* HospitalProfilePageSaga() {
  yield fork(rootHospitalProfilePageSaga);
}
