import {
  LOAD_HOSPITAL_PROFILE,
  LOAD_HOSPITAL_PROFILE_SUCCESS,
  LOAD_HOSPITAL_PROFILE_ERROR,
  loadHospitalProfile
} from './ducks';

export interface HospitalProfilePageProps {
  hospitalProfile: initialStateHospitalProfilePageType;
  loadHospitalProfile: typeof loadHospitalProfile;
  match: any;
  // onSubmit: typeof updateHospitalProfilePage;
  intl: any;
  push: typeof push;
  //----------
  // export interface SearchListPageProps {
  //   searchList: initialStateSearchListPageType;
  //   loadSearchList: typeof loadSearchList;
  // }
}

export interface HospitalProfileDataType {
  address: string;
  address_arabic: string;
  api_key: string;
  city: string;
  city_arabic: string;
  city_id: number;
  country_id: number;
  created_date: string;
  email: string;
  hospital: string;
  hospital_arabic: string;
  id: number;
  language: string;
  latitude: string;
  location: string;
  logo: string;
  longitude: string;
  offer: null;
  password: string;
  phone: string;
  phone1: string;
  status: number;
  type: string;
  uniqe_id: string;
  updatedAt: string;
}

export interface initialStateHospitalProfilePageType {
  data: HospitalProfileDataType;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface loadHospitalProfile {
  type: typeof LOAD_HOSPITAL_PROFILE;
  id: number;
}
export interface loadHospitalProfileSuccess {
  type: typeof LOAD_HOSPITAL_PROFILE_SUCCESS;
  data: HospitalProfileDataType;
}
export interface loadHospitalProfileError {
  type: typeof LOAD_HOSPITAL_PROFILE_ERROR;
  error: string;
}

export type HospitalProfilePageActionTypes =
  | loadHospitalProfile
  | loadHospitalProfileSuccess
  | loadHospitalProfileError;
