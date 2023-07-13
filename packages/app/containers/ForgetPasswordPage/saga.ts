import { take, call, put, select, fork } from 'redux-saga/effects';
import { FORGOT_PASSWORD, forgotPasswordSuccess } from './ducks';
import API from '../../utils/api';
import { HOSPITAL_TYPE } from '../../utils/constants';
import { makeSelectUserType } from '../User/ducks';
import { push } from 'connected-react-router';
import {
  ROUTE_PATIENT_LOGIN,
  ROUTE_HOSPITAL_LOGIN
} from '../../utils/constants';
import { showSnackbar } from '../Snackbar/ducks';
import { store } from '../../App';
import messages from './messages';
import { FormattedMessage } from 'react-intl';
import { getLocalizeRoute } from '../../utils/helper';

/**
 * Load forgetPasswordPage saga
 */
export function* rootForgetPasswordPageSaga() {
  while (true) {
    const { values, action } = yield take(FORGOT_PASSWORD);
    const user_type = yield select(makeSelectUserType());
    const lang = store.getState().language.locale;
    try {
      const response = yield call(
        user_type === HOSPITAL_TYPE ? API.postHospitalForgot : API.postForgot,
        values.email
      );
      if (response && response.status === 'success') {
        yield put(forgotPasswordSuccess(response.Result));
        yield put(
          showSnackbar(lang == 'ar' ? response.result_arabic : response.Result)
        );
        yield put(
          push(
            getLocalizeRoute(
              user_type === HOSPITAL_TYPE
                ? ROUTE_HOSPITAL_LOGIN
                : ROUTE_PATIENT_LOGIN
            )
          )
        );
      }
    } catch (error) {
      yield call(action.setErrors, { email: error.message });
      yield call(action.setSubmitting, false);
    }
  }
}

export default function* ForgetPasswordPageSaga() {
  yield fork(rootForgetPasswordPageSaga);
}
