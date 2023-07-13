import { createSelector } from 'reselect';
import produce from 'immer';
import {
  initialStateMultiSelectType,
  MultiSelectActionTypes
} from './types';


/*
 *
 * MultiSelect constants
 *
 */
export const DEFAULT_ACTION = 'app/MultiSelect/DEFAULT_ACTION';


/*
 *
 * MultiSelect reducer
 *
 */
export const initialState : initialStateMultiSelectType = {
  error: '',
  loaded: false,
  loading: false,
};

export default (state = initialState, action: MultiSelectActionTypes) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
    }
  });

/**
 * Direct selector to the multiSelect state domain
 */
const selectMultiSelectDomain = state => state.multiSelect || initialState;

/**
 * Default selector used by MultiSelect
 */
export const makeSelectMultiSelect = () =>
  createSelector(selectMultiSelectDomain, substate => substate);


/*
 *
 * MultiSelect actions
 *
 */
export function defaultAction():MultiSelectActionTypes {
  return {
    type: DEFAULT_ACTION,
  };
}
