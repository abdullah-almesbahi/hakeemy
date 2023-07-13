import { take, call, put, select, fork } from 'redux-saga/effects';
import { SEND_CONTACT_US } from './ducks';
import API from '../../utils/api';
import { showSnackbar } from '../Snackbar/ducks';
import { makeSelectUserType } from '../User/ducks';
import { getMenuRoute, isRtl } from '../../utils/helper';
import { push } from 'connected-react-router';
// import { TEACHER_TYPE } from '../../utils/constants';
// import * as NavigationService from '../../NavigationService';

/**
 * update contactPage saga
 */
export function* updateContactPageSaga() {
  while (true) {
    const { data, action } = yield take(SEND_CONTACT_US);
    try {
      const userType = yield select(makeSelectUserType());
      const response = yield call(
        API.callContactUs,
        data.name,
        data.email,
        data.phone,
        data.message
      );
      if (response && response.status === 'success') {
        if (isRtl()) {
          yield put(showSnackbar(response.result_arabic));
        } else {
          yield put(showSnackbar(response.Result));
        }
        yield call(action.setSubmitting, false);
        yield put(push(getMenuRoute()));
      }
    } catch (error) {
      // yield call(action.setErrors, { item_name: error.message });
      yield call(action.setSubmitting, false);
      // yield put(updateProfileError(error.message));
    }
  }
}

// Individual exports for testing
export default function* ContactPageSaga() {
  yield fork(updateContactPageSaga);
}

//
