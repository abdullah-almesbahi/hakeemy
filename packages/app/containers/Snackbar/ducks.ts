import { createSelector } from 'reselect';
import produce from 'immer';
import { initialStateSnackbarType, SnackbarActionTypes } from './types';

/*
 *
 * Snackbar constants
 *
 */
export const SHOW_SNACKBAR = 'app/Snackbar/SHOW_SNACKBAR';
export const HIDE_SNACKBAR = 'app/Snackbar/HIDE_SNACKBAR';

/*
 *
 * Snackbar reducer
 *
 */
export const initialState: initialStateSnackbarType = {
  message: '',
  visible: false
};

export default (state = initialState, action: SnackbarActionTypes) =>
  produce(state, draft => {
    switch (action.type) {
      case SHOW_SNACKBAR:
        draft.message = action.message;
        draft.visible = true;
        break;

      case HIDE_SNACKBAR:
        draft.message = '';
        draft.visible = false;
        break;
    }
  });

/**
 * Direct selector to the snackbar state domain
 */
const selectSnackbarDomain = state => state.snackbar || initialState;

/**
 * Default selector used by Snackbar
 */
export const makeSelectSnackbar = () =>
  createSelector(
    selectSnackbarDomain,
    substate => substate
  );

/*
 *
 * Snackbar actions
 *
 */
export function showSnackbar(message: string): SnackbarActionTypes {
  return {
    type: SHOW_SNACKBAR,
    message
  };
}

export function hideSnackbar(): SnackbarActionTypes {
  return {
    type: HIDE_SNACKBAR
  };
}
