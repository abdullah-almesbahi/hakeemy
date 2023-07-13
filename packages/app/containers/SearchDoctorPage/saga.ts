import { take, call, put, select, fork, takeLatest } from 'redux-saga/effects';
import {
  LOAD_COUNTRY_LIST,
  loadCountryListSuccess,
  loadCountryListError,
  LOAD_CITIES_LIST,
  loadCitiesListSuccess,
  loadCitiesListError,
  LOAD_INSURANCES_LIST,
  loadInsurancesListError,
  loadInsurancesListSuccess,
  SUGGEST_SEARCH,
  suggestSearchSuccess,
  suggestSearchError,
  LOAD_SPECIALITIES,
  loadSpecialitiesSuccess
  // loadDoctorsByHospitalNameError,
  // loadDoctorsByHospitalNameSuccess,
  // LOAD_DOCTORS_BY_HOSPITAL_NAME,
  // CHECKER_INPUTS,
  // checkerInputsError,
  // checkerInputsSuccess,
  // checkerInputsHospitalbyNameSuccess,
  // checkerInputsSpecialityByNameSuccess,
  // checkerInputsDoctorbynameSuccess
} from './ducks';
import API from '../../utils/api';
import { push } from 'connected-react-router';
import { ROUTE_SEARCH_LIST } from '../../utils/constants';
import { makeSelectLocale } from '../LanguagePage/ducks';
import { showSnackbar } from '../Snackbar/ducks';
import {
  loadNearbyHospitalsSuccess,
  LOAD_NEARBY_HOSPITALS
} from '../SearchListPage/ducks';

/**
 * Load specialities saga
 */
export function* loadSpecialitiesSaga() {
  while (true) {
    yield take(LOAD_SPECIALITIES);
    try {
      const response = yield call(API.getSpecialityByName);
      if (response && response.status === 'success') {
        yield put(loadSpecialitiesSuccess(response.Result));
      }
    } catch (error) {
      yield put(showSnackbar(error.message));
    }
  }
}
/**
 * Load searchDoctorPage saga
 */
export function* rootSearchDoctorPageSaga() {
  while (true) {
    yield take(LOAD_COUNTRY_LIST);
    try {
      const response = yield call(API.getCountry);
      if (response && response.status === 'success') {
        yield put(loadCountryListSuccess(response.Result));
      }
    } catch (error) {
      yield put(showSnackbar(error.message));
      yield put(loadCountryListError(error.message));
    }
  }
}
/**
 * Load cities saga
 */
export function* loadCitiesSaga() {
  while (true) {
    const { country } = yield take(LOAD_CITIES_LIST);
    try {
      const response = yield call(API.getCity);
      if (response && response.status === 'success') {
        yield put(loadCitiesListSuccess(response.Result, country));
      }
    } catch (error) {
      yield put(loadCitiesListError(error.message));
    }
  }
}
/**
 * Load insurances saga
 */
export function* loadInsurancesSaga() {
  while (true) {
    const { country } = yield take(LOAD_INSURANCES_LIST);
    try {
      const response = yield call(API.getInsurance);
      if (response && response.status === 'success') {
        yield put(loadInsurancesListSuccess(response.Result, country));
      }
    } catch (error) {
      yield put(loadInsurancesListError(error.message));
    }
  }
}

/**
 * search text input saga
 */
// export function* onSearchPressSaga() {
//   while (true) {
//     const { values, action } = yield take(CHECKER_INPUTS);
//     console.log("values", values);
//     console.log("action", action);

//     const language = yield select(makeSelectLocale());
//     try {
//       let response;
//       if (values.search !== "") {
//         console.log("object", values);
//         response = yield call(
//           API.getHospitalbyname,
//           values.search,
//           language === "ar" ? "arabi" : "english"
//         );
//         if (
//           response &&
//           response.status === "success" &&
//           response.Result.length > 0
//         ) {
//           yield put(checkerInputsHospitalbyNameSuccess(response.Result));
//           yield put(push(ROUTE_SEARCH_LIST));
//         } else {
//           // response = yield call(API.getSpecialityByName, values.hospitalName);
//           response = yield call(API.getSpecialityByName, values.search);
//           if (
//             response &&
//             response.status === "success" &&
//             response.Result.length > 0
//           ) {
//             yield put(checkerInputsSpecialityByNameSuccess(response.Result));
//           } else {
//             response = yield call(API.getDoctorbyname, values.search);
//             if (
//               response &&
//               response.status === "success" &&
//               response.Result.length > 0
//             ) {
//               yield put(checkerInputsDoctorbynameSuccess(response.Result));
//             }
//           }
//         }
//       } else {
//         yield put(push(ROUTE_SEARCH_LIST));
//       }
//     } catch (error) {
//       yield put(checkerInputsError(error.message));
//     }
//   }
// }

/**
 * Suggest search saga
 */
export function* suggestSearchSaga(action: any) {
  const { text } = action;
  if (text.length < 1) {
    return;
  }

  try {
    const response = yield API.getSuggestSearch(text);
    if (response && response.status === 'success') {
      yield put(suggestSearchSuccess(response.Result));
    }
  } catch (error) {
    yield put(suggestSearchError(error.Result));
  }
}

/**
 * Load nearHospitalPage saga
 */
export function* rootNearHospitalSaga() {
  while (true) {
    const { lat_long, limit, offset } = yield take(LOAD_NEARBY_HOSPITALS);
    // console.log('nearHospital', lat_long);
    const lang = yield select(makeSelectLocale());
    try {
      const response = yield call(API.nearHospital, lat_long, limit, offset);

      if (response && response.status === 'success') {
        if (response.Result && response.Result === 'Sorry, No Results Found') {
          throw new Error(
            lang === 'ar' ? response.result_arabic : response.Result
          );
        }
        yield put(loadNearbyHospitalsSuccess(response.Result));
      }
    } catch (error) {
      // yield put(showSnackbar(error.message));
      //   yield put(scheduleLoadingError(error.message));
    }
  }
}

// Individual exports for testing
export default function* SearchDoctorPageSaga() {
  yield fork(loadSpecialitiesSaga);
  yield fork(rootSearchDoctorPageSaga);
  yield fork(loadCitiesSaga);
  yield fork(loadInsurancesSaga);
  yield fork(rootNearHospitalSaga);
  yield takeLatest(SUGGEST_SEARCH, suggestSearchSaga);
  // yield fork(onSearchPressSaga);
}
