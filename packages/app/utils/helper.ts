import { store } from '../App';
import { HOSPITAL_TYPE, PATIENT_TYPE, DOCTOR_TYPE } from './constants';
import { Platform } from '../components/Platform';
import { Dimensions, Linking } from 'react-native';
import {
  ROUTE_MENU,
  ROUTE_HOSPITAL_MENU,
  ROUTE_PATIENT_MENU
} from './constants';
import { themeHospital, themePatient } from '../containers/App/themes';
import { LanguageOption } from '../containers/LanguagePage/types';
const { width, height } = Dimensions.get('screen');

export const isLoggedIn = () => {
  const user = store.getState().user;
  if (user.id > 0 && user.access_token.length > 5) {
    return true;
  }
  return false;
};

export const isHospital = () => {
  const user_type = store.getState().user.user_type;
  if (user_type === HOSPITAL_TYPE) {
    return true;
  }
  return false;
};

export const isDoctor = () => {
  const user_type = store.getState().user.user_type;
  if (user_type === DOCTOR_TYPE) {
    return true;
  }
  return false;
};

export const isPatient = () => {
  const user_type = store.getState().user.user_type;
  if (user_type === PATIENT_TYPE) {
    return true;
  }
  return false;
};

export const isRtl = () => {
  const language = store.getState().language.locale;
  if (language === 'ar') {
    return true;
  }
  return false;
};

export const getSiteName = () => {
  const language = store.getState().language.locale;
  if (language === 'ar') {
    return 'حكيمي | %s';
  }
  return 'Hakeemy | %s';
};

export const getTheme = () => {
  if (isHospital()) {
    return themeHospital;
  } else {
    return themePatient;
  }
};

export const getMenuRoute = () => {
  const userid = store.getState().user.id;
  if (userid > 0) {
    if (isHospital()) {
      return getLocalizeRoute(ROUTE_HOSPITAL_MENU);
    } else if (isPatient()) {
      return getLocalizeRoute(ROUTE_PATIENT_MENU);
    }
  } else {
    return getLocalizeRoute(ROUTE_MENU);
  }
  // if (Platform.OS == 'web') {
  //   if (width < 500) {
  //     return '/menuTab';
  //   } else {
  //     return ROUTE_MENU;
  //   }
  // } else {
  //   return '/menuTab';
  // }
};

export const openURL = url => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.log(`Don't know how to open URI: ${url}`);
    }
  });
};

export const metaDescription = (desc: string) => {
  return [{ name: 'description', content: desc }];
};

export const isEmpty = (text: string) => {
  return text != '' && text != null && text != 'null' && text != undefined
    ? false
    : true;
};

export const getLocalizeRoute = (
  path: string,
  language: LanguageOption | null = null
) => {
  if (Platform.OS == 'web') {
    const locale = store.getState().language.locale;
    if (language != null) {
      if (path.includes('/ar/') && language == 'ar') {
        return path;
      } else if (path.includes('/en/') && language == 'en') {
        return path;
      } else {
        if (path.includes('/ar/') && language == 'en') {
          return path.replace('/ar/', '/en/');
        } else if (path.includes('/en/') && language == 'ar') {
          return path.replace('/en/', '/ar/');
        }
        return `/${language}` + path;
      }
    } else {
      return `/${locale}` + path;
    }
  }
  return path;
};

export const compose = (fn1: (a: any) => any, ...fns: Array<(a: any) => any>) =>
  fns.reduce((prevFn, nextFn) => value => prevFn(nextFn(value)), fn1);
