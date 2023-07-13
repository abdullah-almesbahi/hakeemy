import {
  LOAD_COUNTRY_LIST,
  LOAD_COUNTRY_LIST_SUCCESS,
  LOAD_COUNTRY_LIST_ERROR,
  loadCountryList,
  LOAD_CITIES_LIST,
  LOAD_CITIES_LIST_SUCCESS,
  LOAD_CITIES_LIST_ERROR,
  LOAD_INSURANCES_LIST,
  LOAD_INSURANCES_LIST_SUCCESS,
  LOAD_INSURANCES_LIST_ERROR,
  PUSH_SELECTED_CITY,
  PUSH_SELECTED_INSURANCE,
  SUGGEST_SEARCH_SUCCESS,
  SUGGEST_SEARCH_ERROR,
  SUGGEST_SEARCH,
  suggestSearch
} from './ducks';
import { push } from 'connected-react-router';
import { FormikActions } from 'formik';

export interface CountryDataType {
  id: number;
  country: string;
  country_arabic: string;
}

export interface CitiesDataType {
  id: number;
  city: string;
  city_arabic: string;
  country_id: number;
  country: string;
  country_arabic: string;
}

export interface InsurancesDataType {
  id: number;
  insurance: string;
  insurance_arabic: string;
  country_id: number;
  country: string;
  country_arabic: string;
}

export interface selectedDataType {
  country: number;
  city_id: number;
  insurance_id: number;
  latitude: number;
  longitude: number;
}

export interface doctordsByHospitalNameDataType {
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
  city: string;
  city_arabic: string;
  country: string;
  country_arabic: string;
}

export interface SearchDoctorPageProps {
  loadCountryList: typeof loadCountryList;
  searchDoctor: initialStateSearchDoctorPageType;
  push: typeof push;
  intl: any;
  suggestSearch: typeof suggestSearch;
  // onSubmit: typeof updateSearchDoctorPage;
}
// export interface SearchDoctorPageProps {
//   loadCitiesList: typeof loadCitiesList;
//   searchDoctor: initialStateSearchDoctorPageType;
//   push: typeof push;
//   intl: any;
// }
// export interface SearchDoctorPageProps {
//   loadInsurancesList: typeof loadInsurancesList;
//   searchDoctor: initialStateSearchDoctorPageType;
//   push: typeof push;
//   intl: any;
// }

export interface FormSearchDoctorPageProps {
  // onSubmit: typeof updateSearchDoctorPage;
  intl: any;
  push: typeof push;
  suggestSearch: typeof suggestSearch;
}

export interface SuggestSearchType {
  name: string;
  name_arabic: string;
  relevance: number;
}

export interface initialStateSearchDoctorPageType {
  countryData: Array<CountryDataType>;
  citiesData: Array<CitiesDataType>;
  insurancesData: Array<InsurancesDataType>;
  suggestData: Array<SuggestSearchType>;
  suggestLoading: boolean;
  doctordsByHospitalNameData: Array<doctordsByHospitalNameDataType>;
  selected: Array<selectedDataType>;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface loadCountryListAction {
  type: typeof LOAD_COUNTRY_LIST;
}
export interface loadCountryListSuccessAction {
  type: typeof LOAD_COUNTRY_LIST_SUCCESS;
  countryData: Array<CountryDataType>;
}
export interface loadCountryListErrorAction {
  type: typeof LOAD_COUNTRY_LIST_ERROR;
  error: string;
}

export interface loadCitiesListAction {
  type: typeof LOAD_CITIES_LIST;
}
export interface loadCitiesListSuccessAction {
  type: typeof LOAD_CITIES_LIST_SUCCESS;
  citiesData: Array<CitiesDataType>;
}
export interface loadCitiesListErrorAction {
  type: typeof LOAD_CITIES_LIST_ERROR;
  error: string;
}
export interface pushSelectedCityAction {
  type: typeof PUSH_SELECTED_CITY;
}

export interface loadInsurancesListAction {
  type: typeof LOAD_INSURANCES_LIST;
}
export interface loadInsurancesListSuccessAction {
  type: typeof LOAD_INSURANCES_LIST_SUCCESS;
  insurancesData: Array<InsurancesDataType>;
}
export interface loadInsurancesListErrorAction {
  type: typeof LOAD_INSURANCES_LIST_ERROR;
  error: string;
}
export interface pushSelectedInsuranceAction {
  type: typeof PUSH_SELECTED_INSURANCE;
}
export interface loadDoctorsByHospitalNameAction {
  type: typeof LOAD_DOCTORS_BY_HOSPITAL_NAME;
}
export interface loadDoctorsByHospitalNameSuccessAction {
  type: typeof LOAD_DOCTORS_BY_HOSPITAL_NAME_SUCCESS;
  insurancesData: Array<InsurancesDataType>;
}
export interface loadDoctorsByHospitalNameErrorAction {
  type: typeof LOAD_DOCTORS_BY_HOSPITAL_NAME_ERROR;
  error: string;
}

export interface suggestSearchAction {
  type: typeof SUGGEST_SEARCH;
  text: string;
}
export interface suggestSearchSuccessAction {
  type: typeof SUGGEST_SEARCH_SUCCESS;
  data: Array<SuggestSearchType>;
}
export interface suggestSearchErrorAction {
  type: typeof SUGGEST_SEARCH_ERROR;
  error: string;
}

// export interface updateAction {
//   type: typeof UPDATE_ACTION,
//   data: any;
//   action: FormikActions<any>;
// }

export type SearchDoctorPageActionTypes =
  | loadCountryListAction
  | loadCountryListSuccessAction
  | loadCountryListErrorAction
  | loadCitiesListAction
  | loadCitiesListSuccessAction
  | loadCitiesListErrorAction
  | pushSelectedCityAction
  | loadInsurancesListAction
  | loadInsurancesListSuccessAction
  | loadInsurancesListErrorAction
  | pushSelectedInsuranceAction
  | loadDoctorsByHospitalNameAction
  | loadDoctorsByHospitalNameSuccessAction
  | loadDoctorsByHospitalNameErrorAction
  | suggestSearchAction
  | suggestSearchSuccessAction
  | suggestSearchErrorAction;
