// import { take, call, put, select, fork } from 'redux-saga/effects';
// import { DEFAULT_ACTION, UPDATE_ACTION } from './ducks';
// import API from '../../utils/api';

// /**
//  * Load  LauncherPage saga
//  */
// export function* rootLauncherPageSaga() {
//   while (true) {
//     yield take(DEFAULT_ACTION);
//     try {
//       const response = yield call(API.getSettingStatus);
//       if (response && response.status === true) {
//         // yield put(schedulesLoaded(response.data));
//       }
//     } catch (error) {
//       // yield put(scheduleLoadingError(error.message));
//     }
//   }
// }

// /**
//  * update LauncherPage saga
//  */
// export function* updateLauncherPageSaga() {
//   while (true) {
//     const { data, action } = yield take(UPDATE_ACTION);
//     try {
//       const response = yield call(API.setTeacherPersonalInfo, data);
//       if (response && response.status === true) {
//         // yield put(updateProfileSuccess());
//         // yield call(action.setSubmitting, false);
//         // yield put(push(ROUTE_SETTINGS));
//       }
//     } catch (error) {
//       // yield call(action.setErrors, { item_name: error.message });
//       // yield call(action.setSubmitting, false);
//       // yield put(updateProfileError(error.message));
//     }
//   }
// }

// // Individual exports for testing
// export default function* LauncherPageSaga() {
//   yield fork(rootLauncherPageSaga);
//   yield fork(updateLauncherPageSaga);
// }
