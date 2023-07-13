import { take, call, put, select, fork } from 'redux-saga/effects';
import {
  LOAD_SEARCH_LIST,
  loadSearchListError,
  loadSearchListSuccess,
  LOAD_NEARBY_HOSPITALS,
  loadNearbyHospitalsSuccess
} from './ducks';

import API from '../../utils/api';
import { showSnackbar } from '../Snackbar/ducks';
import { store } from '../../App';

/**
 * Load  searchListPage saga
 */
export function* rootSearchListPageSaga() {
  while (true) {
    const { data } = yield take(LOAD_SEARCH_LIST);
    try {
      const response = yield call(API.getSearchDoctor, data);
      // const response = yield call(API.getSearchDoctor, {
      //   ...data,
      //   doctor: 16569
      // });
      if (response && response.status === 'success' && response.Results) {
        yield put(loadSearchListSuccess(response.Results));
      } else {
        throw Error(response.Result);
      }
    } catch (error) {
      yield put(showSnackbar(error.message));
      yield put(loadSearchListError(error.message));
    }
  }
}

// Individual exports for testing
export default function* SearchListPageSaga() {
  yield fork(rootSearchListPageSaga);
  // yield fork(rootNearHospitalSaga);
}
