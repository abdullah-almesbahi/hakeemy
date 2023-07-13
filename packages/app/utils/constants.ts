import { Platform } from '../components/Platform';
import { I18nManager } from 'react-native';

export const VERSION = '1';
export const AP_VERSION = 'v1';
export const GOOGLE_MAP_KEY = 'AIzaSyC0GVIt3YsDM5u6uZudr18rSulVLYFEnzA';
export const FONT = 'Cairo';

export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';
// export const FONT: t.t('dir') == 'rtl' ? (Platform.OS == 'ios' ? 'GESSTwoLight-Light' : 'GE_SS_Two_Light') : 'Helvetica',
export const FONT = I18nManager.isRTL
  ? Platform.OS == 'ios'
    ? 'Tajawal'
    : 'Tajawal-Regular'
  : 'Tajawal';

let tmp_url;
export const REACT_DEBUG = __DEV__;
if (Platform.OS === 'web') {
  tmp_url = process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL
    : 'https://old.hakeemy.com';
} else {
  // tmp_url = REACT_DEBUG
  //   ? 'http://192.168.88.87:8000'
  //   : 'https://old.hakeemy.com';
  tmp_url = REACT_DEBUG ? 'https://old.hakeemy.com' : 'https://old.hakeemy.com';
  // tmp_url = REACT_DEBUG ? 'http://192.168.88.4:8000' : 'https://old.hakeemy.com';
}

export const API_URL = tmp_url;

// console.log('URL', API_URL);

export const UPLOAD_URL = REACT_DEBUG
  ? process.env.REACT_APP_UPLOAD_URL
    ? process.env.REACT_APP_UPLOAD_URL
    : 'https://old.hakeemy.com/uploads'
  : process.env.REACT_APP_UPLOAD_URL
  ? process.env.REACT_APP_UPLOAD_URL
  : 'https://old.hakeemy.com/uploads';

export const SITE_NAME_HOME = I18nManager.isRTL ? 'حكيمي | %s' : 'Hakeemy | %s';
export const SITE_NAME = I18nManager.isRTL ? '%s | حكيمي' : '%s | Hakeemy';
export const DEFAULT_MAP_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };
export const SITE_URL = 'https://www.hakeemy.com';

export const HOSPITAL_TYPE = 1;
export const PATIENT_TYPE = 2;
export const ADMIN_TYPE = 3;
export const DOCTOR_TYPE = 4;
export const GRAY_BACKGROUND = '#efefef';
export const GRAY_TEXT = '#b5b5b7';

export const NOTIFICATION_TYPE_REQUEST_HOSPITAL = 1;
export const NOTIFICATION_TYPE_CANCEL_REQUEST = 2;
export const NOTIFICATION_TYPE_BOOKED_REQUEST = 4;
export const NOTIFICATION_TYPE_SETTING = 8;
export const NOTIFICATION_TYPE_PAYMENT = 6;
export const NOTIFICATION_TYPE_ONMYWAY = 9;

/**
 * Routes
 */

//hospital
export const ROUTE_HOSPITAL_HOME = '/hospital/appointments/';
export const ROUTE_HOSPITAL_APPOINTMENTS = '/hospital/appointments/';
export const ROUTE_HOSPITAL_SCHEDULES = '/hospital/schedules/';
export const ROUTE_HOSPITAL_DOCTORS = '/hospital/doctors/';
export const ROUTE_HOSPITAL_MENU = '/hospital/menu/';
// export const ROUTE_HOSPITAL_APPOINTMENTS = '/hospital-appointments/';
export const ROUTE_HOSPITAL_DOCTORS_SCHEDULE = '/hospital-doctors-schedule/';
// export const ROUTE_HOSPITAL_DOCTORS = '/hospital-doctors/';
export const ROUTE_HOSPITAL_CHANGE_PASSWORD = '/hospital/change-password/';
export const ROUTE_ADD_DOCTOR_SCHEDULE = '/add-doctor-schedule/';
export const ROUTE_ADD_DOCTOR = '/add-doctor/';
export const ROUTE_HOSPITAL_REGISTRATION = '/hospital';
export const ROUTE_HOSPITAL_LOGIN = '/hospital/login';

//patient
export const ROUTE_SEARCH_LIST = '/patient/search';
export const ROUTE_PATIENT_HOME = '/patient/home';
export const ROUTE_PATIENT_SEARCH = '/patient/search/';
export const ROUTE_PATIENT_MENU = '/patient/menu/';
export const ROUTE_PATIENT_APPOINTMENTS = '/patient/appointments/';
export const ROUTE_PATIENT_CHANGE_PASSWORD = '/patient/change-password/';
export const ROUTE_PATIENT_LOGIN = '/patient/login';
// export const ROUTE_MY_APPOINTMENTS = '/my-appointments/';
export const ROUTE_REGISTER = '/patient/signup';
export const ROUTE_DOCTOR_PROFILE = '/patient/viewdoctor';
export const ROUTE_HOSPITAL_PROFILE = '/hospital-profile/';

export const ROUTE_LOCATION = '/location/';
export const ROUTE_HOME_PATIENT = '/home-patient/';

//common
export const ROUTE_LAUNCHER = '/';
export const ROUTE_FORGET_PASSWORD = '/forget-password/';
export const ROUTE_PAGE = '/page';
export const ROUTE_BLOG = '/blog/';
export const ROUTE_BLOG_POST = '/blog/posts/';
export const ROUTE_VIEW_POST = '/blog/post/view/';
export const ROUTE_LANGUAGE = '/language/';
export const ROUTE_NOT_FOUND = '';
export const ROUTE_MENU = '/menu/';
export const ROUTE_CONTACTUS = '/home/contactus';
export const ROUTE_ACCOUNT = '/account';
export const ROUTE_ABOUT_HAKEEMY = '/home/aboutus';
export const ROUTE_SEARCH_DOCTOR = '/search-doctor/';
