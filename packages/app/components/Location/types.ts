import {
  LOAD_LOCATION_ERROR,
  LOAD_LOCATION_SUCCESS,
  LOAD_LOCATION,
  loadLocation,
  UPDATE_LOCATION,
  UPDATE_LOCATION_SUCCESS,
  UPDATE_LOCATION_ERROR,
  updateLocation,
  SUGGEST_LOCATION_ERROR,
  SUGGEST_LOCATION_SUCCESS,
  SUGGEST_LOCATION,
  suggestLocation,
  UPDATE_LOCATION_OPTION,
  updateLocationOption,
  loadLocationSuccess
} from './ducks';
import { LanguageOption } from '../LanguagePage/types';
import { NavigationStackProp } from 'react-navigation-stack';

export interface LocationPageProps {
  // onSubmit: typeof updateLocationPage;
  // intl: any;
  // push: typeof push;
  language: LanguageOption;
  location: initialStateLocationPageType;
  loadLocation: typeof loadLocation;
  updateLocation: typeof updateLocation;
  loadLocationSuccess: typeof loadLocationSuccess;
  suggestLocation: typeof suggestLocation;
  updateLocationOption: typeof updateLocationOption;
  navigation: NavigationStackProp;
  intl: any;
  onBack: () => void;
}

export interface UpdateLocationDataType {
  postal_code: number;
  address: string;
  city?: string;
  country_name: string;
  latitude: number;
  longitude: number;
}

export interface LocationDataType {
  user_location_id?: number;
  user_id?: number;
  address: string;
  country_name: string;
  city: string;
  postal_code: number;
  latitude: number;
  longitude: number;
  user_km_range?: number;
  gender?: string;
}

export interface SuggestDataType {
  description: string;
  id: string;
  matched_substrings: Array<object>;
  place_id: string;
  reference: string;
  structured_formatting: {
    main_text: string;
    main_text_matched_substrings: Array<object>;
    secondary_text: string;
  };
  terms: Array<{ offset: number; value: string }>;
  types: Array<string>;
}

export interface initialStateLocationPageType {
  data: LocationDataType;
  suggest: Array<SuggestDataType>;
  showSuggest: boolean;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface loadLocationAction {
  type: typeof LOAD_LOCATION;
}
export interface loadLocationSuccessAction {
  type: typeof LOAD_LOCATION_SUCCESS;
  data: LocationDataType;
}
export interface loadLocationErrorAction {
  type: typeof LOAD_LOCATION_ERROR;
  error: string;
}

export interface updateLocationAction {
  type: typeof UPDATE_LOCATION;
  data: UpdateLocationDataType;
}
export interface updateLocationSuccessAction {
  type: typeof UPDATE_LOCATION_SUCCESS;
}
export interface updateLocationErrorAction {
  type: typeof UPDATE_LOCATION_ERROR;
  error: string;
}

export interface suggestLocationAction {
  type: typeof SUGGEST_LOCATION;
  text: string;
}
export interface suggestLocationSuccessAction {
  type: typeof SUGGEST_LOCATION_SUCCESS;
  data: Array<SuggestDataType>;
}
export interface suggestLocationErrorAction {
  type: typeof SUGGEST_LOCATION_ERROR;
  error: string;
}
export interface updateLocationOptionAction {
  type: typeof UPDATE_LOCATION_OPTION;
  key: any;
  value: any;
}

export type LocationPageActionTypes =
  | loadLocationAction
  | loadLocationSuccessAction
  | loadLocationErrorAction
  | updateLocationAction
  | updateLocationSuccessAction
  | updateLocationErrorAction
  | suggestLocationAction
  | suggestLocationSuccessAction
  | suggestLocationErrorAction
  | updateLocationOptionAction;
