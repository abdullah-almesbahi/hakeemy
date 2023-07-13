import { take, call, put, select, fork } from 'redux-saga/effects';
import {
  LOAD_DOCTOR_PROFILE,
  loadDoctorProfileSuccess,
  loadDoctorProfileError,
  BOOK_APPOINTMENT,
  bookAppointmentSuccess,
  bookAppointmentError,
  CONFIRM_SMS,
  confirmSmsSuccess,
  confirmSmsError,
  initialState,
  makeSelectDoctorProfilePage
} from './ducks';
import API from '../../utils/api';
import { showSnackbar } from '../Snackbar/ducks';
import { setUser, makeSelectUser, makeSelectUserId } from '../User/ducks';
import { push } from 'connected-react-router';
import { ROUTE_LAUNCHER } from '../../utils/constants';
import { I18nManager } from 'react-native';
import { getLocalizeRoute } from '../../utils/helper';

/**
 * Load  doctorProfilePage saga
 */
export function* rootDoctorProfilePageSaga() {
  while (true) {
    const { id } = yield take(LOAD_DOCTOR_PROFILE);
    // const userInfo = yield select(makeSelectDoctorProfilePage);
    // console.log('userInfo000', userInfo);
    try {
      const response = yield call(API.getDoctorProfile, id);
      if (response && response.status === 'success') {
        yield put(loadDoctorProfileSuccess(response.Result));
      }
    } catch (error) {
      yield put(loadDoctorProfileError(error.message));
    }
  }
}

export function* confirmSmsSaga() {
  while (true) {
    const { values, actions } = yield take(CONFIRM_SMS);
    const userId = yield select(makeSelectUserId());
    // console.log('11111');
    const _userInfo = yield select(makeSelectDoctorProfilePage());
    // console.log('userInfo', _userInfo);

    // console.log('111111111', values);
    try {
      // console.log('22222');
      const response = yield call(API.postVerifyAppointments, {
        appointment_id: values.appointment_id.appointment_id,
        verification_code: values.verification_code
      });
      // console.log('33333');
      if (response && response.status === 'success') {
        // console.log('444444');
        yield put(confirmSmsSuccess());
        // console.log('555555');
        yield put(
          showSnackbar(
            I18nManager.isRTL ? response.result_arabic : response.Result
          )
        );
        // console.log('666666');
        userId > 0
          ? null
          : yield put(
              setUser({
                mobile: _userInfo.userInfo.mobile,
                name: _userInfo.userInfo.name,
                api_key: _userInfo.userInfo.api_key,
                id: _userInfo.userInfo.id
              })
            );
        yield put(push(getLocalizeRoute(ROUTE_LAUNCHER + 'myAppointments')));
      }
    } catch (error) {
      if (
        error.message == 'Invalid Verification code' ||
        'كود التأكيد غير صالح'
      ) {
        yield call(actions.setErrors, {
          verification_code: I18nManager.isRTL
            ? 'كود التأكيد غير صحيح'
            : 'Invalid Verification code'
        });
        // yield put(showSnackbar(error.message));
        // console.log('aaaa');
      } else {
        console.log('error saga', error);
        yield put(showSnackbar(error.message));
        yield put(confirmSmsError(error.message));
      }
    }
  }
}

export function* bookAppointmentSaga() {
  while (true) {
    const { values, actions } = yield take(BOOK_APPOINTMENT);
    const userId = yield select(makeSelectUserId());

    const userPhone = yield select(makeSelectUser());
    // console.log('3333333', values);

    if (userId > 0 && userPhone.mobile !== values.mobile) {
      try {
        const response = yield call(API.postPatientUpdate, {
          api_key: values.api_key,
          mobile: values.mobile
        });
        if (response && response.status === 'success') {
          yield put(setUser(response.response));
        }

        const response2 = yield call(API.bookAppointment, {
          api_key: values.api_key,
          doctor_id: values.doctor_id,
          schedule_id: values.schedule
        });
        if (response2 && response2.status === 'success') {
          yield put(bookAppointmentSuccess(response2.response.id));
        }
      } catch (error) {
        yield put(bookAppointmentError(error.message));
      }
    } else {
      try {
        const response = yield call(API.bookAppointment, {
          api_key: values.api_key == null ? null : values.api_key,
          phone: values.mobile,
          doctor_id: values.doctor_id,
          schedule_id: values.schedule,
          name: values.name == null ? null : values.name
        });
        if (response && response.status === 'success') {
          yield put(
            bookAppointmentSuccess(
              response.response.id,
              response.response.patientData
            )
          );
        }
      } catch (error) {
        yield put(bookAppointmentError(error.message));
      }
    }
  }
}

export default function* DoctorProfilePageSaga() {
  yield fork(rootDoctorProfilePageSaga);
  yield fork(bookAppointmentSaga);
  yield fork(confirmSmsSaga);
}
