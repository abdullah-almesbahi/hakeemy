import {
  LOAD_NEAR_HOSPITAL,
  LOAD_NEAR_HOSPITAL_SUCCESS,
  LOAD_NEAR_HOSPITAL_ERROR,
  loadNearHospital
  // UPDATE_ACTION,
} from './ducks';
import { push } from 'connected-react-router';

export interface NearHospitalPageProps {
  // onSubmit: typeof updateNearHospitalPage;
  intl: any;
  loadNearHospital: typeof loadNearHospital;
  nearHospital: initialStateNearHospitalPageType;
  push: typeof push;
}

export interface hospitalType {
  address: string;
  address_arabic: string;
  api_key: string;
  city_id: number;
  country_id: number;
  created_date: string;
  distance: number;
  email: string;
  hospital: string;
  hospital_arabic: string;
  id: number;
  language: string;
  latitude: string;
  location: string;
  logo: string;
  longitude: string;
  password: string;
  phone: string;
  phone1: string;
  status: number;
  type: string;
  type_arabic: string;
  uniqe_id: string;
  updatedAt: string;
}

export interface initialStateNearHospitalPageType {
  data: Array<hospitalType>;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface loadNearHospitalAction {
  type: typeof LOAD_NEAR_HOSPITAL;
  lat_long: string;
  limit: number;
  offset: number;
}
export interface loadNearHospitalSuccessAction {
  type: typeof LOAD_NEAR_HOSPITAL_SUCCESS;
  data: any;
}
export interface loadNearHospitalErrorAction {
  type: typeof LOAD_NEAR_HOSPITAL_ERROR;
  message: string;
}

export type NearHospitalPageActionTypes =
  | loadNearHospitalAction
  | loadNearHospitalSuccessAction
  | loadNearHospitalErrorAction;
