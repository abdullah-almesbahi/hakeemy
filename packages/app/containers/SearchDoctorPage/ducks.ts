import { createSelector } from 'reselect';
import produce from 'immer';
import {
  initialStateSearchDoctorPageType,
  SearchDoctorPageActionTypes,
  CountryDataType,
  CitiesDataType,
  InsurancesDataType,
  SuggestSearchType
} from './types';
import { number } from 'prop-types';
// import ProfilePageSaga from '../ProfilePage/saga';

/*
 *
 * SearchDoctorPage constants
 *
 */
export const SET_SEARCH_WORD = 'app/SearchDoctorPage/SET_SEARCH_WORD';
export const LOAD_COUNTRY_LIST = 'app/SearchDoctorPage/LOAD_COUNTRY_LIST';
export const LOAD_COUNTRY_LIST_SUCCESS =
  'app/SearchDoctorPage/LOAD_COUNTRY_LIST_SUCCESS';
export const LOAD_COUNTRY_LIST_ERROR =
  'app/SearchDoctorPage/LOAD_COUNTRY_LIST_ERROR';

export const LOAD_CITIES_LIST = 'app/SearchDoctorPage/LOAD_CITIES_LIST';
export const LOAD_CITIES_LIST_SUCCESS =
  'app/SearchDoctorPage/LOAD_CITIES_LIST_SUCCESS';
export const LOAD_CITIES_LIST_ERROR =
  'app/SearchDoctorPage/LOAD_CITIES_LIST_ERROR';
export const PUSH_SELECTED_CITY = 'app/SearchDoctorPage/PUSH_SELECTED_CITY';

export const LOAD_INSURANCES_LIST = 'app/SearchDoctorPage/LOAD_INSURANCES_LIST';
export const LOAD_INSURANCES_LIST_SUCCESS =
  'app/SearchDoctorPage/LOAD_INSURANCES_LIST_SUCCESS';
export const LOAD_INSURANCES_LIST_ERROR =
  'app/SearchDoctorPage/LOAD_INSURANCES_LIST_ERROR';
export const PUSH_SELECTED_INSURANCE =
  'app/SearchDoctorPage/PUSH_SELECTED_INSURANCE';

export const PUSH_SELECTED_LOCATION =
  'app/SearchDoctorPage/PUSH_SELECTED_LOCATION';

export const SUGGEST_SEARCH = 'app/SearchDoctorPage/SUGGEST_SEARCH';
export const SUGGEST_SEARCH_SUCCESS =
  'app/SearchDoctorPage/SUGGEST_SEARCH_SUCCESS';
export const SUGGEST_SEARCH_ERROR = 'app/SearchDoctorPage/SUGGEST_SEARCH_ERROR';

export const LOAD_SPECIALITIES = 'app/SearchDoctorPage/LOAD_SPECIALITIES';
export const LOAD_SPECIALITIES_SUCCESS =
  'app/SearchDoctorPage/LOAD_SPECIALITIES_SUCCESS';

export const SET_COUNTRY = 'app/SearchDoctorPage/SET_COUNTRY';

// export const CHECKER_INPUTS = "app/SearchListPage/CHECKER_INPUTS";
// export const CHECKER_INPUTS_HOSPITAL_BY_NAME_SUCCESS =
//   "app/SearchListPage/CHECKER_INPUTS_HOSPITAL_BY_NAME_SUCCESS";
// export const CHECKER_INPUTS_SPECIALITY_BY_NAME_SUCCESS =
//   "app/SearchListPage/CHECKER_INPUTS_SPECIALITY_BY_NAME_SUCCESS";
// export const CHECKER_INPUTS_DOCTOR_BY_NAME_SUCCESS =
//   "app/SearchListPage/CHECKER_INPUTS_DOCTOR_BY_NAME_SUCCESS";
// export const CHECKER_INPUTS_ERROR = "app/SearchListPage/CHECKER_INPUTS_ERROR";

/*
 *
 * SearchDoctorPage reducer
 *
 */
export const initialState: initialStateSearchDoctorPageType = {
  specialities: [],
  countryData: [],
  citiesData: [],
  insurancesData: [],
  suggestData: [],
  suggestLoading: false,
  // hospitalData: [],
  // specialityData: [],
  // nameData: [],
  selected: {
    search: '',
    country: 0,
    city_id: 0,
    insurance_id: 0,
    latitude: 0,
    longitude: 0
  },
  error: '',
  loaded: false,
  loading: false
};

export default (state = initialState, action: SearchDoctorPageActionTypes) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_SEARCH_WORD:
        draft.selected.search = action.word;
        break;
      case LOAD_SPECIALITIES_SUCCESS:
        draft.specialities = action.data;
        // draft.loading = false;
        break;
      case LOAD_COUNTRY_LIST:
        return (draft = {
          ...initialState,
          selected: {
            ...initialState.selected,
            latitude: state.selected.latitude,
            longitude: state.selected.longitude
          },
          // citiesData: [],
          // insurancesData: [],
          loading: true
        });
        break;
      case LOAD_COUNTRY_LIST_SUCCESS:
        draft.countryData = action.countryData;
        draft.loading = false;
        break;
      case LOAD_COUNTRY_LIST_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case LOAD_CITIES_LIST:
        draft.loading = true;
        draft.selected.country = action.country;
        draft.citiesData = [];
        // draft.nsurancesData = [];
        break;
      case LOAD_CITIES_LIST_SUCCESS:
        draft.citiesData = action.citiesData.filter(
          d => d.country_id === action.country
        );
        draft.loading = false;
        break;
      case LOAD_CITIES_LIST_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case PUSH_SELECTED_CITY:
        draft.selected.city_id = action.city_id;
        break;
      case PUSH_SELECTED_LOCATION:
        draft.selected.latitude = action.latitude;
        draft.selected.longitude = action.longitude;
        // draft.selected.country = 1;
        draft.selected.city_id = 0;
        draft.selected.insurance_id = 0;
        break;

      case LOAD_INSURANCES_LIST:
        draft.loading = true;
        // draft.citiesData = [];
        draft.nsurancesData = [];
        break;
      case LOAD_INSURANCES_LIST_SUCCESS:
        draft.insurancesData = action.insurancesData.filter(
          d => d.country_id === action.country
        );
        draft.loading = false;
        break;
      case LOAD_INSURANCES_LIST_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case PUSH_SELECTED_INSURANCE:
        draft.selected.insurance_id = action.insurance_id;
        break;

      case SUGGEST_SEARCH:
        draft.suggestLoading = true;
        // draft.error = '';
        break;
      case SUGGEST_SEARCH_SUCCESS:
        draft.suggestData = action.data;
        draft.suggestLoading = false;
        break;
      case SUGGEST_SEARCH_ERROR:
        // draft.error = action.error;
        draft.suggestLoading = false;
        break;
      case SET_COUNTRY:
        // draft.error = action.error;
        draft.selected.country = action.country;
        draft.selected.search = action.search;
        break;

      // checkerInputs
      //     case CHECKER_INPUTS:
      //       draft.loading = true;
      //     case CHECKER_INPUTS_HOSPITAL_BY_NAME_SUCCESS:
      //       draft.hospitalData = action.hospital;
      //       draft.loading = false;
      //       console.log("good job", draft.hospitalData);
      //       break;
      //     case CHECKER_INPUTS_SPECIALITY_BY_NAME_SUCCESS:
      //       console.log("qwqwqwqw", action.name.find(name == action.name));
      //       draft.specialityData = action.name;
      //       draft.loading = false;
      //       // push(ROUTE_SEARCH_LIST);
      //       break;
      //     case CHECKER_INPUTS_DOCTOR_BY_NAME_SUCCESS:
      //       draft.nameData = action.name;
      //       draft.loading = false;
      //       // push(ROUTE_SEARCH_LIST);
      //       break;
      //     case CHECKER_INPUTS_ERROR:
      //       draft.error = action.error;
      //       draft.loading = false;
      //       break;
    }
  });

/**
 * Direct selector to the searchDoctorPage state domain
 */
const selectSearchDoctorPageDomain = state =>
  state.searchDoctor || initialState;

/**
 * Default selector used by SearchDoctorPage
 */
export const makeSelectSearchDoctorPage = () =>
  createSelector(
    selectSearchDoctorPageDomain,
    substate => substate
  );

export const makeSelectSearchDoctorSelected = () =>
  createSelector(
    selectSearchDoctorPageDomain,
    substate => substate.selected
  );

/*
 *
 * SearchDoctorPage actions
 *
 */
export function setSearchWord(word): SearchDoctorPageActionTypes {
  return {
    type: SET_SEARCH_WORD,
    word
  };
}
export function loadSpecialities(): SearchDoctorPageActionTypes {
  return {
    type: LOAD_SPECIALITIES
  };
}
export function loadSpecialitiesSuccess(data): SearchDoctorPageActionTypes {
  return {
    type: LOAD_SPECIALITIES_SUCCESS,
    data
  };
}
export function loadCountryList(): SearchDoctorPageActionTypes {
  return {
    type: LOAD_COUNTRY_LIST
  };
}
export function loadCountryListSuccess(
  countryData: Array<CountryDataType>
): SearchDoctorPageActionTypes {
  return {
    type: LOAD_COUNTRY_LIST_SUCCESS,
    countryData
  };
}
export function loadCountryListError(
  error: string
): SearchDoctorPageActionTypes {
  return {
    type: LOAD_COUNTRY_LIST_ERROR,
    error
  };
}

export function loadCitiesList(country): SearchDoctorPageActionTypes {
  return {
    type: LOAD_CITIES_LIST,
    country
  };
}
export function loadCitiesListSuccess(
  citiesData: Array<CitiesDataType>,
  country
): SearchDoctorPageActionTypes {
  return {
    type: LOAD_CITIES_LIST_SUCCESS,
    citiesData,
    country
  };
}
export function loadCitiesListError(
  error: string
): SearchDoctorPageActionTypes {
  return {
    type: LOAD_CITIES_LIST_ERROR,
    error
  };
}
export function pushSelectedCity(city_id): SearchDoctorPageActionTypes {
  return {
    type: PUSH_SELECTED_CITY,
    city_id
  };
}
export function pushSelectedLocation(
  latitude,
  longitude
): SearchDoctorPageActionTypes {
  return {
    type: PUSH_SELECTED_LOCATION,
    latitude,
    longitude
  };
}

export function setSearchAndCountry(
  search: string,
  country: number
): SearchDoctorPageActionTypes {
  return {
    type: SET_COUNTRY,
    search,
    country
  };
}

export function loadInsurancesList(country): SearchDoctorPageActionTypes {
  return {
    type: LOAD_INSURANCES_LIST,
    country
  };
}
export function loadInsurancesListSuccess(
  insurancesData: Array<InsurancesDataType>,
  country
): SearchDoctorPageActionTypes {
  return {
    type: LOAD_INSURANCES_LIST_SUCCESS,
    insurancesData,
    country
  };
}
export function loadInsurancesListError(
  error: string
): SearchDoctorPageActionTypes {
  return {
    type: LOAD_INSURANCES_LIST_ERROR,
    error
  };
}
export function pushSelectedInsurance(
  insurance_id
): SearchDoctorPageActionTypes {
  return {
    type: PUSH_SELECTED_INSURANCE,
    insurance_id
  };
}

// on Search Press
// export function checkerInputs(values, action): SearchDoctorPageActionTypes {
//   return {
//     type: CHECKER_INPUTS,
//     values,
//     action
//   };
// }
// export function checkerInputsHospitalbyNameSuccess(
//   hospital
// ): SearchDoctorPageActionTypes {
//   return {
//     type: CHECKER_INPUTS_HOSPITAL_BY_NAME_SUCCESS,
//     hospital
//   };
// }
// export function checkerInputsSpecialityByNameSuccess(
//   name
// ): SearchDoctorPageActionTypes {
//   return {
//     type: CHECKER_INPUTS_SPECIALITY_BY_NAME_SUCCESS,
//     name
//   };
// }
// export function checkerInputsDoctorbynameSuccess(
//   name
// ): SearchDoctorPageActionTypes {
//   return {
//     type: CHECKER_INPUTS_DOCTOR_BY_NAME_SUCCESS,
//     name
//   };
// }
// export function checkerInputsError(error: string): SearchDoctorPageActionTypes {
//   return {
//     type: CHECKER_INPUTS_ERROR,
//     error
//   };
// }

// export function updateSearchDoctorPage(
//   data,
//   action
// ): SearchDoctorPageActionTypes {
//   return {
//     type: UPDATE_ACTION,
//     data,
//     action
//   };
// }

export function suggestSearch(text: string): SearchDoctorPageActionTypes {
  return {
    type: SUGGEST_SEARCH,
    text
  };
}

/**
 * Dispatch when saga suggest location success
 *
 * @param {object} data
 * @returns {SearchDoctorPageActionTypes}
 */
export function suggestSearchSuccess(
  data: Array<SuggestSearchType>
): SearchDoctorPageActionTypes {
  return {
    type: SUGGEST_SEARCH_SUCCESS,
    data
  };
}

/**
 * Dispatch when saga suggest location failed
 *
 * @export
 * @param {string} error
 * @returns {SearchDoctorPageActionTypes}
 */
export function suggestSearchError(error: string): SearchDoctorPageActionTypes {
  return {
    type: SUGGEST_SEARCH_ERROR,
    error
  };
}
