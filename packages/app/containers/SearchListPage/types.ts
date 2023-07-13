import {
  LOAD_SEARCH_LIST,
  LOAD_SEARCH_LIST_ERROR,
  LOAD_SEARCH_LIST_SUCCESS,
  loadSearchList
} from './ducks';

export interface SearchListPageProps {
  searchList: initialStateSearchListPageType;
  loadSearchList: typeof loadSearchList;
  intl: any;
}

export interface DoctorDataType {
  id: number;
  name: string;
  name_arabic: string;
  phone: string;
  email: string;
  password: string;
  picture: null | string;
  speciality_id: number;
  status: number;
  mohcard: null;
  moh_id: number;
  gender: string;
  designation: string;
  doctor_cv: string;
  created_date: string;
  api_key: string;
  designation_arabic: string;
  speciality: string;
  speciality_arabic: string;
  rating: 0;
  persons: 0;
  doctor_address: Array<DoctorAddressDataType>;
}

export interface DoctorAddressDataType {
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
  uniqe_id: number;
  latitude: number;
  longitude: number;
  language: string;
  location: string;
  address_arabic: string;
  country_id: number;
  created_date: string;
  type_arabic: string;
  is_offer: number;
}

export interface initialStateSearchListPageType {
  data: Array<DoctorDataType>;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface loadSearchListAction {
  type: typeof LOAD_SEARCH_LIST;
  data: any;
}
export interface loadSearchListSuccessAction {
  type: typeof LOAD_SEARCH_LIST_SUCCESS;
  data: Array<DoctorDataType>;
}
export interface loadSearchListErrorAction {
  type: typeof LOAD_SEARCH_LIST_ERROR;
  error: string;
}

export type SearchListPageActionTypes =
  | loadSearchListAction
  | loadSearchListSuccessAction
  | loadSearchListErrorAction;
