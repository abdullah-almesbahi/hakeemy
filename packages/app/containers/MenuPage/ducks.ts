import { createSelector } from 'reselect';
import produce from 'immer';
import { initialStateMenuPageType, MenuPageActionTypes } from './types';

/*
 *
 * MenuPage constants
 *
 */
export const DEFAULT_ACTION = 'app/MenuPage/DEFAULT_ACTION';

/*
 *
 * MenuPage reducer
 *
 */
export const initialState: initialStateMenuPageType = {
  error: '',
  loaded: false,
  loading: false
};

export default (state = initialState, action: MenuPageActionTypes) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
    }
  });

/**
 * Direct selector to the mePage state domain
 */
const selectMenuPageDomain = state => state.mePage || initialState;

/**
 * Default selector used by MenuPage
 */
export const makeSelectMenuPage = () =>
  createSelector(
    selectMenuPageDomain,
    substate => substate
  );

/*
 *
 * MenuPage actions
 *
 */
export function defaultAction(): MenuPageActionTypes {
  return {
    type: DEFAULT_ACTION
  };
}
