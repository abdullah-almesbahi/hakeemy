import { take, call, put, fork, select } from 'redux-saga/effects';
import {
  CREATE_NEW_PATIENT,
  createNewPatientSuccess,
  patientUpdateSuccess
} from './ducks';
import API from '../../utils/api';
import { ROUTE_PATIENT_LOGIN } from '../../utils/constants';
import { push } from 'connected-react-router';
import { showSnackbar } from '../Snackbar/ducks';
import { makeSelectUserId, setUser } from '../User/ducks';
import { I18nManager } from 'react-native';
import { getLocalizeRoute } from '../../utils/helper';

/**
 * Load  registerPage saga
 */
export function* rootRegisterPageSaga() {
  while (true) {
    const { values, actions } = yield take(CREATE_NEW_PATIENT);
    const userId = yield select(makeSelectUserId());

    if (userId < 1) {
      try {
        // console.log('befor');
        const response = yield call(API.postPatientRegister, {
          age: values.age,
          name: values.name,
          email: values.email.toLowerCase(),
          password: values.password,
          mobile: values.mobile,
          gender: values.gender,
          mail_subs: values.mail_subs
        });
        // console.log('after');
        if (response && response.status === 'success') {
          yield put(
            showSnackbar(
              I18nManager.isRTL
                ? 'يرجى مراجعة بريدك الإلكتروني لاكمال التسجيل'
                : response.Result
            )
          );
          yield put(push(getLocalizeRoute(ROUTE_PATIENT_LOGIN)));
          yield put(createNewPatientSuccess());
        }
      } catch (error) {
        // yield put(createNewPatientError(error.message));
        yield call(actions.setErrors, { email: error.message });
        yield call(actions.setSubmitting, false);
      }
    } else if (userId > 0) {
      // console.log('aaaaaaa', values);
      try {
        const response = yield call(API.postPatientUpdate, {
          api_key: values.api_key,
          age: values.age,
          name: values.name,
          email: values.email,
          mobile: values.mobile,
          gender: values.gender
          // mail_subs: values.mail_subs == true ? 1 : 0
        });
        if (response && response.status === 'success') {
          // console.log('ddddd', response.Result);
          yield put(setUser(response.response));
          yield put(showSnackbar('Updated successfully'));
          // yield put(push(ROUTE_PATIENT_LOGIN));
          yield put(patientUpdateSuccess());
        }
      } catch (error) {
        // yield put(createNewPatientError(error.message));
        // yield call(actions.setErrors, { email: error.message });
        yield put(showSnackbar(error.message));
        yield call(actions.setErrors, error.message);
        yield call(actions.setSubmitting, false);
      }
    }
  }
}

export default function* RegisterPageSaga() {
  yield fork(rootRegisterPageSaga);
  // yield fork(patientUpdateSaga);
}
