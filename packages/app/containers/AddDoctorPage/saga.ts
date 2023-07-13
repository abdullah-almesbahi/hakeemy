import { take, call, put, select, fork } from 'redux-saga/effects';
import {
  LOAD_SPECIALITIES,
  loadSpecialitiesSuccess,
  loadSpecialitiesError,
  CREATE_DOCTOR,
  createDoctorSuccess,
  createDoctorError
} from './ducks';
import API from '../../utils/api';
import { showSnackbar } from '../Snackbar/ducks';
import { store } from '../../App';
import { push } from 'connected-react-router';
import { ROUTE_HOSPITAL_DOCTORS } from '../../utils/constants';
import { getLocalizeRoute } from '../../utils/helper';

/**
 * Load addDoctorPage saga
 */
export function* rootAddDoctorPageSaga() {
  while (true) {
    yield take(LOAD_SPECIALITIES);
    try {
      const response = yield call(API.getSpecialityByName);
      //   _post_multipart
      if (response && response.status === 'success') {
        yield put(loadSpecialitiesSuccess(response.Result));
      }
    } catch (error) {
      yield put(loadSpecialitiesError(error.message));
    }
  }
}

export function* createDoctorSaga() {
  while (true) {
    const { values, action } = yield take(CREATE_DOCTOR);
    // console.log('objectvalues', values);
    const lang = store.getState().language.locale;
    try {
      const response = yield call(API.postDoctorCreate, values);
      if (response && response.status === 'success') {
        yield put(createDoctorSuccess());
        yield put(
          showSnackbar(lang == 'en' ? response.Result : response.result_arabic)
        );
        yield put(push(getLocalizeRoute(ROUTE_HOSPITAL_DOCTORS)));
      }
    } catch (error) {
      yield put(showSnackbar(error.message));
      yield put(createDoctorError(error.message));
    }
  }
}

// Individual exports for testing
export default function* AddDoctorPageSaga() {
  yield fork(rootAddDoctorPageSaga);
  yield fork(createDoctorSaga);
}
