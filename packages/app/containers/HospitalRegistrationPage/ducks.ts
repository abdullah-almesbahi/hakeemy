import { createSelector } from 'reselect';
import produce from 'immer';
import {
  initialStateHospitalRegistrationPageType,
  HospitalRegistrationPageActionTypes
} from './types';
import { makeSelectUserId } from '../User/ducks';

/*
 *
 * HospitalRegistrationPage constants
 *
 */

export const LOAD_COUNTRY_LIST =
  'app/HospitalRegistrationPage/LOAD_COUNTRY_LIST';
export const LOAD_COUNTRY_LIST_SUCCESS =
  'app/HospitalRegistrationPage/LOAD_COUNTRY_LIST_SUCCESS';
export const LOAD_COUNTRY_LIST_ERROR =
  'app/HospitalRegistrationPage/LOAD_COUNTRY_LIST_ERROR';

export const LOAD_CITIES_LIST = 'app/HospitalRegistrationPage/LOAD_CITIES_LIST';
export const LOAD_CITIES_LIST_SUCCESS =
  'app/HospitalRegistrationPage/LOAD_CITIES_LIST_SUCCESS';
export const LOAD_CITIES_LIST_ERROR =
  'app/HospitalRegistrationPage/LOAD_CITIES_LIST_ERROR';
// export const PUSH_SELECTED_CITY =
//   'app/HospitalRegistrationPage/PUSH_SELECTED_CITY';

export const LOAD_INSURANCES_LIST =
  'app/HospitalRegistrationPage/LOAD_INSURANCES_LIST';
export const LOAD_INSURANCES_LIST_SUCCESS =
  'app/HospitalRegistrationPage/LOAD_INSURANCES_LIST_SUCCESS';
export const LOAD_INSURANCES_LIST_ERROR =
  'app/HospitalRegistrationPage/LOAD_INSURANCES_LIST_ERROR';

export const SELECT_CHECKBOX = 'app/HospitalRegistrationPage/SELECT_CHECKBOX';
export const UNSELECT_CHECKBOX =
  'app/HospitalRegistrationPage/UNSELECT_CHECKBOX';
export const LOAD_SELECTED_CHECKBOX =
  'app/HospitalRegistrationPage/LOAD_SELECTED_CHECKBOX';

export const CREATE_NEW_HOSPITAL =
  'app/HospitalRegistrationPage/CREATE_NEW_HOSPITAL';
export const CREATE_NEW_HOSPITAL_SUCCESS =
  'app/HospitalRegistrationPage/CREATE_NEW_HOSPITAL_SUCCESS';

export const DISABLED = 'app/HospitalRegistrationPage/DISABLED';
export const ENABLE = 'app/HospitalRegistrationPage/ENABLE';

export const HOSPITAL_UPDATE = 'app/HospitalRegistrationPage/HOSPITAL_UPDATE';
export const HOSPITAL_UPDATE_SUCCESS =
  'app/HospitalRegistrationPage/HOSPITAL_UPDATE_SUCCESS';
export const HOSPITAL_UPDATE_ERROR =
  'app/HospitalRegistrationPage/HOSPITAL_UPDATE_ERROR';

/*
 *
 * HospitalRegistrationPage reducer
 *
 */
export const initialState: initialStateHospitalRegistrationPageType = {
  countryData: [],
  citiesData: [],
  insurancesData: [],
  selectedCheckedbox: [],
  selected: { country: 0 },
  disabledStatus: true,
  error: '',
  loaded: false,
  loading: false
};

export default (
  state = initialState,
  action: HospitalRegistrationPageActionTypes
) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_COUNTRY_LIST:
        draft.loading = true;
        draft.selectedCheckedbox = [];
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
        // draft.selected.country = action.country;
        break;
      case LOAD_CITIES_LIST_SUCCESS:
        const citites = action.citiesData.filter(
          d => parseFloat(d.country_id) === parseFloat(action.country)
        );
        draft.citiesData = citites;
        break;
      case LOAD_CITIES_LIST_ERROR:
        draft.error = action.error;
        break;
      case LOAD_INSURANCES_LIST:
        break;

      case LOAD_INSURANCES_LIST_SUCCESS:
        draft.insurancesData = action.insurancesData.filter(
          d => parseFloat(d.country_id) === parseFloat(action.country)
        );
        draft.loading = false;
        break;
      case LOAD_INSURANCES_LIST_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case SELECT_CHECKBOX:
        draft.selectedCheckedbox.push(action.values);
        break;
      case UNSELECT_CHECKBOX:
        draft.selectedCheckedbox.splice(
          draft.selectedCheckedbox.findIndex(
            checkedbox => checkedbox.value === action.values.value
          ),
          1
        );
        break;
      case LOAD_SELECTED_CHECKBOX:
        draft.selectedCheckedbox = action.insurances;
        break;

      case CREATE_NEW_HOSPITAL:
        draft.loading = true;
        break;
      case CREATE_NEW_HOSPITAL_SUCCESS:
        draft.loading = false;
        break;

      case DISABLED:
        draft.disabledStatus = false;
        break;
      case ENABLE:
        draft.disabledStatus = true;
        break;

      case HOSPITAL_UPDATE:
        draft.loading = true;
        break;
      case HOSPITAL_UPDATE_SUCCESS:
        draft.loading = false;
        break;
      case HOSPITAL_UPDATE_ERROR:
        draft.loading = false;
        break;
    }
  });

/**
 * Direct selector to the hospitalRegistrationPage state domain
 */
const selectHospitalRegistrationPageDomain = state =>
  state.hospitalRegistration || initialState;

/**
 * Default selector used by HospitalRegistrationPage
 */
export const makeSelectHospitalRegistrationPage = () =>
  createSelector(
    selectHospitalRegistrationPageDomain,
    substate => substate
  );

export function loadCountryList(): HospitalRegistrationPageActionTypes {
  return {
    type: LOAD_COUNTRY_LIST
  };
}
export function loadCountryListSuccess(
  countryData: Array<CountryDataType>
): HospitalRegistrationPageActionTypes {
  return {
    type: LOAD_COUNTRY_LIST_SUCCESS,
    countryData
  };
}
export function loadCountryListError(
  error: string
): HospitalRegistrationPageActionTypes {
  return {
    type: LOAD_COUNTRY_LIST_ERROR,
    error
  };
}

export function loadCitiesList(country): HospitalRegistrationPageActionTypes {
  return {
    type: LOAD_CITIES_LIST,
    country
  };
}
export function loadCitiesListSuccess(
  citiesData: Array<CitiesDataType>,
  country
): HospitalRegistrationPageActionTypes {
  return {
    type: LOAD_CITIES_LIST_SUCCESS,
    citiesData,
    country
  };
}
export function loadCitiesListError(
  error: string
): HospitalRegistrationPageActionTypes {
  return {
    type: LOAD_CITIES_LIST_ERROR,
    error
  };
}

export function loadInsurancesList(
  country
): HospitalRegistrationPageActionTypes {
  return {
    type: LOAD_INSURANCES_LIST,
    country
  };
}
export function loadInsurancesListSuccess(
  insurancesData: Array<InsurancesDataType>,
  country
): HospitalRegistrationPageActionTypes {
  return {
    type: LOAD_INSURANCES_LIST_SUCCESS,
    insurancesData,
    country
  };
}
export function loadInsurancesListError(
  error: string
): HospitalRegistrationPageActionTypes {
  return {
    type: LOAD_INSURANCES_LIST_ERROR,
    error
  };
}

export function selectCheckbox(values): HospitalRegistrationPageActionTypes {
  return {
    type: SELECT_CHECKBOX,
    values
  };
}
export function unselectCheckbox(values): HospitalRegistrationPageActionTypes {
  return {
    type: UNSELECT_CHECKBOX,
    values
  };
}
export function loadSelectedCheckbox(
  insurances
): HospitalRegistrationPageActionTypes {
  return {
    type: LOAD_SELECTED_CHECKBOX,
    insurances
  };
}

export function createNewHospital(
  data,
  action
): HospitalRegistrationPageActionTypes {
  return {
    type: CREATE_NEW_HOSPITAL,
    data,
    action
  };
}
export function createNewHospitalSuccess(): HospitalRegistrationPageActionTypes {
  return {
    type: CREATE_NEW_HOSPITAL_SUCCESS
  };
}

export function makeDisabled(): HospitalRegistrationPageActionTypes {
  return {
    type: DISABLED
  };
}
export function makeEnable(): HospitalRegistrationPageActionTypes {
  return {
    type: ENABLE
  };
}

export function hospitalUpdate(
  values,
  actions
): HospitalRegistrationPageActionTypes {
  return {
    type: HOSPITAL_UPDATE,
    values,
    actions
  };
}
export function hospitalUpdateSuccess(): HospitalRegistrationPageActionTypes {
  return {
    type: HOSPITAL_UPDATE_SUCCESS
  };
}
export function hospitalUpdateError(): HospitalRegistrationPageActionTypes {
  return {
    type: HOSPITAL_UPDATE_ERROR
  };
}
