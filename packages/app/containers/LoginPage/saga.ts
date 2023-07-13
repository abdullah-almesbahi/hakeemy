import { call, put, select, fork, take } from 'redux-saga/effects';
import { LOGIN_REQUEST } from './ducks';
import { makeSelectUserType, setUser } from '../User/ducks';
import { _post } from '../../utils/request';
import API from '../../utils/api';
import { push } from 'connected-react-router';
import {
  ROUTE_OTP,
  ROUTE_HOSPITAL_HOME,
  ROUTE_HOME_PATIENT,
  ROUTE_LAUNCHER,
  ROUTE_PATIENT_HOME
} from '../../utils/constants';
import { SET_OTP } from '../User/ducks';
import { HOSPITAL_TYPE } from '../../utils/constants';
import { useInjectSaga } from '../../utils/injectSaga';
import history from '../../utils/history';
import { showSnackbar } from '../Snackbar/ducks';
import { isHospital, isPatient, getLocalizeRoute } from '../../utils/helper';

/**
 * Log in saga
 */
export function* loginFlow() {
  // Because sagas are generators, doing `while (true)` doesn't block our program
  // Basically here we say "this saga is always listening for actions"
  while (true) {
    // eslint-disable-line no-constant-condition
    // And we're listening for `LOGIN_REQUEST` actions and destructuring its payload
    // Our LOGIN_REQUEST action passes along the form values as the payload and form actions as
    // meta data. This allows us to not only use the values to do whatever API calls and such
    // we need, but also to maintain control flow here in our saga.
    const { payload: values, meta: actions } = yield take(LOGIN_REQUEST);
    const user_type = yield select(makeSelectUserType());
    const doctorIdIndex = history.location.search.indexOf('doctorId');
    const doctorId = history.location.search.slice(
      doctorIdIndex + 9,
      doctorIdIndex + 14
    );
    const appintmentTimeIndex = history.location.search.indexOf(
      'appintmentTime'
    );
    const appintmentTime = history.location.search.slice(
      appintmentTimeIndex + 15,
      appintmentTimeIndex + 21
    );

    try {
      const response = yield call(
        user_type === HOSPITAL_TYPE ? API.postHospitalLogin : API.postLogin,
        values.email,
        values.password
      );

      if (response && response.status === 'success') {
        // ...we send Redux appropiate actions
        yield put(setUser(response.Result));
        // localStorage.setItem('token', response.Result.token);
        // yield put(push(ROUTE_LAUNCHER+"?tab-1"));
        if (isHospital()) {
          yield put(push(getLocalizeRoute(ROUTE_HOSPITAL_HOME)));
        } else if (isPatient()) {
          yield put(push(getLocalizeRoute(ROUTE_PATIENT_HOME)));
        }
      }
    } catch (error) {
      if (actions === null) {
        yield put(showSnackbar(error.message));
      } else {
        yield call(actions.setErrors, { email: error.message });
        yield call(actions.setSubmitting, false);
      }
    }
  }
}

// The root saga is what we actually send to Redux's middleware. In here we fork
// each saga so that they are all "active" and listening.
// Sagas are fired once at the start of an app and can be thought of as processes running
// in the background, watching actions dispatched to the store.
export default function* root() {
  yield fork(loginFlow);
}
