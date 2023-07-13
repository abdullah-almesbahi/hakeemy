import { createSelector } from 'reselect';
import produce from 'immer';
import {
  initialStateAccountPageType,
  AccountPageActionTypes
} from './types';


/*
 *
 * AccountPage constants
 *
 */
export const DEFAULT_ACTION = 'app/AccountPage/DEFAULT_ACTION';


/*
 *
 * AccountPage reducer
 *
 */
export const initialState : initialStateAccountPageType = {
  error: '',
  loaded: false,
  loading: false,
};

export default (state = initialState, action: AccountPageActionTypes) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
    }
  });

/**
 * Direct selector to the accountPage state domain
 */
const selectAccountPageDomain = state => state.accountPage || initialState;

/**
 * Default selector used by AccountPage
 */
export const makeSelectAccountPage = () =>
  createSelector(selectAccountPageDomain, substate => substate);


/*
 *
 * AccountPage actions
 *
 */
export function defaultAction():AccountPageActionTypes {
  return {
    type: DEFAULT_ACTION,
  };
}
