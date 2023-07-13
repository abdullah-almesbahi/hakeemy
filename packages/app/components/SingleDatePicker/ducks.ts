import { createSelector } from "reselect";
import produce from "immer";
import {
  initialStateSingleDatePickerType,
  SingleDatePickerActionTypes
} from "./types";

/*
 *
 * SingleDatePicker constants
 *
 */
export const DEFAULT_ACTION = "app/SingleDatePicker/DEFAULT_ACTION";

/*
 *
 * SingleDatePicker reducer
 *
 */
export const initialState: initialStateSingleDatePickerType = {
  error: "",
  loaded: false,
  loading: false
};

export default (state = initialState, action: SingleDatePickerActionTypes) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
    }
  });

/**
 * Direct selector to the multiSelect state domain
 */
const selectSingleDatePickerDomain = state => state.multiSelect || initialState;

/**
 * Default selector used by SingleDatePicker
 */
export const makeSelectSingleDatePicker = () =>
  createSelector(
    selectSingleDatePickerDomain,
    substate => substate
  );

/*
 *
 * SingleDatePicker actions
 *
 */
export function defaultAction(): SingleDatePickerActionTypes {
  return {
    type: DEFAULT_ACTION
  };
}
