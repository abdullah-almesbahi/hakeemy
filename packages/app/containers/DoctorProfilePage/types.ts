import {
  LOAD_DOCTOR_PROFILE,
  LOAD_DOCTOR_PROFILE_SUCCESS,
  LOAD_DOCTOR_PROFILE_ERROR,
  loadDoctorProfile
} from "./ducks";

export interface DoctorProfilePageProps {
  // onSubmit: typeof updateDoctorProfilePage;
  // intl: any;
  // push: typeof push;
  //----------
  // export interface SearchListPageProps {
  //   searchList: initialStateSearchListPageType;
  //   loadSearchList: typeof loadSearchList;
  // }
}

export interface DoctorProfileDataType {
  id: number;
  name: string;
  name_arabic: string;
  phone: string;
  email: string;
  password: string;
  picture: string;
  speciality_id: number;
  status: number;
  mohcard: string;
  moh_id: number;
  gender: string;
  designation: string;
  doctor_cv: string;
  created_date: string;
  api_key: string;
  doctor_id: number;
  speciality: string;
  speciality_arabic: string;
  hospital: string;
  hospital_arabic: string;
  city_id: number;
  phone1: string;
  type: string;
  address: string;
  logo: string;
  uniqe_id: string;
  latitude: string;
  longitude: string;
  language: string;
  location: string;
  address_arabic: string;
  country_id: number;
  rating: string;
  doctor_speciality: Array<DoctorProfileSpecialityDataType>;
  hospitals: Array<DoctorProfileHospitalsDataType>;
}

export interface DoctorProfileSpecialityDataType {
  id: number;
  doctor_id: number;
  speciality_id: number;
  speciality: string;
  speciality_arabic: string;
}

export interface DoctorProfileHospitalsDataType {
  id: number;
  hospital: string;
  hospital_arabic: string;
  password: string;
  city_id: number;
  phone: string;
  phone1: string;
  email: string;
  type: string;
  address: string;
  logo: string;
  status: number;
  api_key: string;
  uniqe_id: string;
  latitude: number;
  longitude: number;
  language: string;
  location: string;
  address_arabic: string;
  country_id: number;
  created_date: string;
}

export interface initialStateDoctorProfilePageType {
  data: Array<DoctorProfileDataType>;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface loadDoctorProfile {
  type: typeof LOAD_DOCTOR_PROFILE;
  data: any;
}
export interface loadDoctorProfileSuccess {
  type: typeof LOAD_DOCTOR_PROFILE_SUCCESS;
  data: Array<DoctorProfileDataType>;
}
export interface loadDoctorProfileError {
  type: typeof LOAD_DOCTOR_PROFILE_ERROR;
  error: string;
}

export type DoctorProfilePageActionTypes =
  | loadDoctorProfile
  | loadDoctorProfileSuccess
  | loadDoctorProfileError;
