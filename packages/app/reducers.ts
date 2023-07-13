/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// import history from './utils/history';
// import globalReducer from './containers/App/reducer';
import languageReducer from './containers/LanguagePage/ducks';
import userReducer from './containers/User/ducks';
import snackbarReducer from './containers/Snackbar/ducks';
import searchListReducer from './containers/SearchListPage/ducks';
import doctorProfileReducer from './containers/DoctorProfilePage/ducks';
import searchDoctorReducer from './containers/SearchDoctorPage/ducks';
import forgetPasswordReducer from './containers/ForgetPasswordPage/ducks';
import hospitalRegistrationReducer from './containers/HospitalRegistrationPage/ducks';
import registerPageReducer from './containers/PatientRegisterPage/ducks';
import AddDoctorScheduleReducer from './containers/AddDoctorSchedulePage/ducks';
import AddDoctorReducer from './containers/AddDoctorPage/ducks';
import hospitalDoctorsSchedulesReducer from './containers/HospitalSchedulesPage/ducks';
import hospitalAppointmentsReducer from './containers/HospitalAppointmentsPage/ducks';
import myAppointmentsReducer from './containers/PatientAppointmentsPage/ducks';
import hospitalDoctorsReducer from './containers/HospitalDoctorsPage/ducks';
import nearHospitalReducer from './containers/NearHospitalPage/ducks';
import hospitalProfileReducer from './containers/HospitalProfilePage/ducks';
import locationReducer from './components/Location/ducks';
// import tabindex from './containers/LauncherPage/ducks';
// import htabindex from './containers/HospitalHomePage/ducks';
import rateApp from './containers/RateApp/ducks';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}, history = {}) {
  const rootReducer = combineReducers({
    // global: globalReducer,
    user: userReducer,
    language: languageReducer,
    snackbar: snackbarReducer,
    searchList: searchListReducer,
    doctorProfile: doctorProfileReducer,
    searchDoctor: searchDoctorReducer,
    forgetPassword: forgetPasswordReducer,
    hospitalRegistration: hospitalRegistrationReducer,
    register: registerPageReducer,
    AddDoctorSchedule: AddDoctorScheduleReducer,
    AddDoctorPage: AddDoctorReducer,
    hospitalDoctorsSchedulePage: hospitalDoctorsSchedulesReducer,
    hospitalAppointments: hospitalAppointmentsReducer,
    myAppointmentsPage: myAppointmentsReducer,
    hospitalDoctorPage: hospitalDoctorsReducer,
    nearHospital: nearHospitalReducer,
    hospitalProfile: hospitalProfileReducer,
    location: locationReducer,
    // tabindex: tabindex,
    rateApp: rateApp,
    // hospitalHomePage: htabindex,
    router: connectRouter(history),
    ...injectedReducers
  });

  return rootReducer;
}

export type AppState = ReturnType<typeof createReducer>;
