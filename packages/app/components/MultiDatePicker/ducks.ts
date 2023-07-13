import { createSelector } from "reselect";
import produce from "immer";
import {
  initialStateMultiDatePickerType,
  MultiDatePickerActionTypes
} from "./types";

/*
 *
 * MultiDatePicker constants
 *
 */
export const DEFAULT_ACTION = "app/MultiDatePicker/DEFAULT_ACTION";

/*
 *
 * MultiDatePicker reducer
 *
 */
export const initialState: initialStateMultiDatePickerType = {
  error: "",
  loaded: false,
  loading: false
};

export default (state = initialState, action: MultiDatePickerActionTypes) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
    }
  });

/**
 * Direct selector to the multiSelect state domain
 */
const selectMultiDatePickerDomain = state => state.multiSelect || initialState;

/**
 * Default selector used by MultiDatePicker
 */
export const makeSelectMultiDatePicker = () =>
  createSelector(
    selectMultiDatePickerDomain,
    substate => substate
  );

/*
 *
 * MultiDatePicker actions
 *
 */
export function defaultAction(): MultiDatePickerActionTypes {
  return {
    type: DEFAULT_ACTION
  };
}
