import { createSelector } from 'reselect';
import produce from 'immer';
import {
  initialStateRateAppType,
  RateAppActionTypes,
  RateTypes
} from './types';
import { LOCATION_CHANGE } from 'connected-react-router';

/*
 *
 * RateApp constants
 *
 */
export const POINT_INCREASE = 'app/RateApp/POINT_INCREASE';
export const RATED = 'app/RateApp/RATED';

/*
 *
 * RateApp reducer
 *
 */
export const initialState: initialStateRateAppType = {
  points: 0,
  rated: false,
  error: '',
  loaded: false,
  loading: false
};

export default (state = initialState, action: RateAppActionTypes) =>
  produce(state, draft => {
    switch (action.type) {
      case POINT_INCREASE:
        draft.points = draft.points + 1;
        break;
      case RATED:
        draft.rated = true;
        break;
      case LOCATION_CHANGE:
        draft.points = state.points + 1;
        break;
    }
  });

/**
 * Direct selector to the rateApp state domain
 */
const selectRateAppDomain = state => state.rateApp || initialState;

/**
 * Default selector used by RateApp
 */
export const makeSelectRateApp = () =>
  createSelector(
    selectRateAppDomain,
    substate => substate
  );

/*
 *
 * RateApp actions
 *
 */
export function pointIncrease(): RateAppActionTypes {
  return {
    type: POINT_INCREASE
  };
}
export function rate(): RateTypes {
  return {
    type: RATED
  };
}
