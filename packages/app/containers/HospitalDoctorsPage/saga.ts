import { take, call, put, select, fork } from 'redux-saga/effects';
import {
  LOAD_DOCTORS_LIST,
  loadDoctorsListSuccess,
  loadDoctorsListError
} from './ducks';
import API from '../../utils/api';
import { showSnackbar } from '../Snackbar/ducks';

/**
 * Load hospitalDoctorsPage saga
 */
export function* rootHospitalDoctorsPageSaga() {
  while (true) {
    const { api_key } = yield take(LOAD_DOCTORS_LIST);
    try {
      const response = yield call(API.getListOfDoctorsForHospital, api_key);
      if (response && response.status === 'success') {
        yield put(loadDoctorsListSuccess(response.Result));
      }
    } catch (error) {
      error.message === 'Record not found'
        ? null
        : yield put(showSnackbar(error.message));
      yield put(loadDoctorsListError(error.message));
    }
  }
}

export default function* HospitalDoctorsPageSaga() {
  yield fork(rootHospitalDoctorsPageSaga);
}
