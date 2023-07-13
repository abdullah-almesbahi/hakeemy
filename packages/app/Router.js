import React from 'react';

// Common Pages
// import LauncherPage from './containers/LauncherPage';
import LoginPage from './containers/LoginPage';
import LanguagePage from './containers/LanguagePage';
import NotFoundPage from './containers/NotFoundPage';
import AccountPage from './containers/AccountPage';
import AboutHakeemyPage from './containers/AboutHakeemyPage';
import SearchDoctorPage from './containers/SearchDoctorPage';
import AddDoctorSchedulePage from './containers/AddDoctorSchedulePage';
import ForgetPasswordPage from './containers/ForgetPasswordPage';
import MenuPage from './containers/MenuPage';
import SearchListPage from './containers/SearchListPage';
import DoctorProfilePage from './containers/DoctorProfilePage';
import HospitalProfilePage from './containers/HospitalProfilePage';
import ChangePasswordPage from './containers/ChangePasswordPage';
import SinglePage from './containers/SinglePage';
import ContactPage from './containers/ContactPage';
import BlogPage from './containers/BlogPage';
import BlogPostPage from './containers/BlogPostPage';
import ViewPostPage from './containers/ViewPostPage';

// Hospital Pages
import HospitalRegistrationPage from './containers/HospitalRegistrationPage';
// import HospitalHomePage from './containers/HospitalHomePage';
import HospitalDoctorsSchedulePage from './containers/HospitalSchedulesPage';
import HospitalAppointmentsPage from './containers/HospitalAppointmentsPage';
import HospitalDoctorsPage from './containers/HospitalDoctorsPage';
import AddDoctorPage from './containers/AddDoctorPage';

// import { createStackNavigator } from 'react-navigation-stack';

// Patient Pages
import RegisterPage from './containers/PatientRegisterPage';
import MyAppointmentsPage from './containers/PatientAppointmentsPage';
import PatientHomePage from './containers/PatientHomePage';
import {
  ROUTE_HOSPITAL_APPOINTMENTS,
  ROUTE_HOSPITAL_CHANGE_PASSWORD,
  ROUTE_ADD_DOCTOR,
  ROUTE_ADD_DOCTOR_SCHEDULE,
  ROUTE_HOSPITAL_SCHEDULES,
  ROUTE_HOSPITAL_MENU,
  ROUTE_HOSPITAL_REGISTRATION,
  ROUTE_PATIENT_HOME,
  ROUTE_SEARCH_LIST,
  ROUTE_PATIENT_CHANGE_PASSWORD,
  ROUTE_ACCOUNT,
  ROUTE_PATIENT_APPOINTMENTS,
  ROUTE_REGISTER,
  ROUTE_HOSPITAL_PROFILE,
  ROUTE_DOCTOR_PROFILE,
  ROUTE_MENU,
  ROUTE_PATIENT_LOGIN,
  ROUTE_LAUNCHER,
  ROUTE_PAGE,
  ROUTE_SEARCH_DOCTOR,
  ROUTE_CONTACTUS,
  ROUTE_BLOG,
  ROUTE_BLOG_POST,
  ROUTE_VIEW_POST,
  ROUTE_ABOUT_HAKEEMY,
  ROUTE_FORGET_PASSWORD,
  ROUTE_HOSPITAL_DOCTORS,
  ROUTE_PATIENT_MENU,
  ROUTE_LANGUAGE,
  ROUTE_NOT_FOUND,
  ROUTE_HOSPITAL_LOGIN
} from './utils/constants';

export const Routes = [
  // Hospital Pages
  // {
  //   path: ROUTE_HOSPITAL_HOME + ':page?',
  //   component: HospitalHomePage,
  //   requiredSignedIn: true
  // },
  {
    path: ROUTE_HOSPITAL_APPOINTMENTS,
    component: HospitalAppointmentsPage,
    requiredSignedIn: true
  },
  {
    path: ROUTE_HOSPITAL_CHANGE_PASSWORD,
    component: ChangePasswordPage,
    requiredSignedIn: true
  },
  {
    path: ROUTE_ADD_DOCTOR_SCHEDULE,
    component: AddDoctorSchedulePage,
    requiredSignedIn: true
  },
  {
    path: ROUTE_ADD_DOCTOR,
    component: AddDoctorPage,
    requiredSignedIn: true
  },
  {
    path: ROUTE_HOSPITAL_SCHEDULES,
    component: HospitalDoctorsSchedulePage,
    requiredSignedIn: true
  },
  // {
  //   path: ROUTE_HOSPITAL_DOCTORS_SCHEDULE,
  //   component: HospitalDoctorsSchedulePage,
  //   requiredSignedIn: false
  // },

  {
    path: ROUTE_HOSPITAL_DOCTORS,
    component: HospitalDoctorsPage,
    requiredSignedIn: true
  },
  {
    path: ROUTE_HOSPITAL_MENU,
    component: MenuPage,
    requiredSignedIn: true
  },
  {
    path: ROUTE_HOSPITAL_REGISTRATION,
    component: HospitalRegistrationPage,
    requiredSignedIn: false
  },
  {
    path: ROUTE_HOSPITAL_LOGIN,
    component: LoginPage,
    requiredSignedIn: false
  },

  // Patient Pages
  {
    path: ROUTE_SEARCH_LIST,
    component: SearchListPage,
    requiredSignedIn: false
  },
  {
    path: ROUTE_PATIENT_HOME,
    component: SearchDoctorPage,
    // component: PatientHomePage,
    requiredSignedIn: true
  },
  {
    path: ROUTE_PATIENT_CHANGE_PASSWORD,
    component: ChangePasswordPage,
    requiredSignedIn: true
  },
  {
    path: ROUTE_PATIENT_MENU,
    component: MenuPage,
    requiredSignedIn: true
  },

  {
    path: ROUTE_ACCOUNT,
    component: AccountPage,
    requiredSignedIn: false
  },

  {
    path: ROUTE_PATIENT_APPOINTMENTS,
    component: MyAppointmentsPage,
    requiredSignedIn: false
  },
  {
    path: ROUTE_REGISTER,
    component: RegisterPage,
    requiredSignedIn: false
  },
  {
    path: ROUTE_DOCTOR_PROFILE + '/:id/:view?',
    component: DoctorProfilePage,
    requiredSignedIn: false
  },
  {
    path: ROUTE_HOSPITAL_PROFILE + '/:id',
    component: HospitalProfilePage,
    requiredSignedIn: true
  },
  {
    path: ROUTE_MENU,
    component: MenuPage,
    requiredSignedIn: false
  },
  {
    path: ROUTE_PATIENT_LOGIN,
    component: LoginPage,
    requiredSignedIn: false
  },

  // {
  //   SearchList: {
  //     path: ROUTE_SEARCH_LIST
  // screen: createStackNavigator(
  //   {
  //     SearchList: SearchListPage,
  //     DoctorProfile: {
  //       path: ROUTE_DOCTOR_PROFILE + '/:id',
  //       screen: DoctorProfilePage
  //     }
  //   },
  //   { headerMode: 'none' }
  // )
  //   }
  // },

  // {
  //   path: ROUTE_OTP,
  //   component: OtpPage,
  //   requiredSignedIn: false
  // },

  // Common Pages
  {
    path: ROUTE_LAUNCHER,
    component: SearchDoctorPage,
    // component: LauncherPage,
    requiredSignedIn: false
  },
  {
    path: ROUTE_SEARCH_DOCTOR,
    component: SearchDoctorPage,
    requiredSignedIn: false
  },

  {
    path: ROUTE_PAGE + '/:slug/',
    component: SinglePage,
    requiredSignedIn: false,
    exact: true
  },
  {
    path: ROUTE_CONTACTUS,
    component: ContactPage,
    requiredSignedIn: false,
    exact: true
  },
  {
    path: ROUTE_BLOG,
    component: BlogPage,
    requiredSignedIn: false,
    exact: true
  },
  {
    path: ROUTE_BLOG_POST + ':id?/',
    component: BlogPostPage,
    requiredSignedIn: false,
    exact: true
  },
  {
    path: ROUTE_VIEW_POST + ':id?/',
    component: ViewPostPage,
    requiredSignedIn: false,
    exact: true
  },
  {
    path: ROUTE_ABOUT_HAKEEMY,
    component: AboutHakeemyPage,
    requiredSignedIn: false
  },
  {
    path: ROUTE_FORGET_PASSWORD,
    component: ForgetPasswordPage,
    requiredSignedIn: false
  },
  {
    path: ROUTE_LANGUAGE,
    component: LanguagePage,
    requiredSignedIn: false
  },
  //Not found must be in the last
  {
    path: ROUTE_NOT_FOUND,
    component: NotFoundPage
  }
];
