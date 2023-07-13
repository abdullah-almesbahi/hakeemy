import { createSelector } from 'reselect';
import produce from 'immer';
import { initialStateLauncherPageType, LauncherPageActionTypes } from './types';

/*
 *
 * LauncherPage constants
 *
 */
export const TABINDEX = 'app/LauncherPage/TABINDEX';

/*
 *
 * LauncherPage reducer
 *
 */
export const initialState: initialStateLauncherPageType = {
  index: 'findDoctor',
  error: '',
  loaded: false,
  loading: false
};

export default (state = initialState, action: LauncherPageActionTypes) =>
  produce(state, draft => {
    switch (action.type) {
      case TABINDEX:
        draft.index = action.index;
        break;
    }
  });

/**
 * Direct selector to the LauncherPage state domain
 */
const selectLauncherPageDomain = state => state.tabindex || initialState;

/**
 * Default selector used by LauncherPage
 */
export const makeSelectLauncherPage = () =>
  createSelector(
    selectLauncherPageDomain,
    substate => substate
  );

/*
 *
 * LauncherPage actions
 *
 */
export function tabindex(index): LauncherPageActionTypes {
  return {
    type: TABINDEX,
    index
  };
}
