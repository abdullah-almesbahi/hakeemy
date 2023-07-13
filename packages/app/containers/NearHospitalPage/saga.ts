import { take, call, put, select, fork } from 'redux-saga/effects';
import { LOAD_NEAR_HOSPITAL, loadNearHospitalSuccess } from './ducks';
import API from '../../utils/api';
import { showSnackbar } from '../Snackbar/ducks';
import { store } from '../../App';

/**
 * Load nearHospitalPage saga
 */
export function* rootNearHospitalPageSaga() {
  while (true) {
    const { lat_long, limit, offset } = yield take(LOAD_NEAR_HOSPITAL);
    const lang = store.getState().language.locale;
    try {
      const response = yield call(API.nearHospital, lat_long, limit, offset);

      if (response && response.status === 'success') {
        if (response.Result && response.Result === 'Sorry, No Results Found') {
          throw new Error(
            lang === 'ar' ? response.result_arabic : response.Result
          );
        }
        yield put(loadNearHospitalSuccess(response.Result));
      }
    } catch (error) {
      yield put(showSnackbar(error.message));
      //   yield put(scheduleLoadingError(error.message));
    }
  }
}

// Individual exports for testing
export default function* NearHospitalPageSaga() {
  yield fork(rootNearHospitalPageSaga);
}
