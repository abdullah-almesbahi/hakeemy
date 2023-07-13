import { createSelector } from 'reselect';
import produce from 'immer';
import { initialStateContactPageType, ContactPageActionTypes } from './types';

/*
 *
 * ContactPage constants
 *
 */
export const SEND_CONTACT_US = 'app/ContactPage/SEND_CONTACT_US';

/*
 *
 * ContactPage reducer
 *
 */
export const initialState: initialStateContactPageType = {
  error: '',
  loaded: false,
  loading: false
};

export default (state = initialState, action: ContactPageActionTypes) =>
  produce(state, draft => {
    switch (action.type) {
      case SEND_CONTACT_US:
        break;
    }
  });

/**
 * Direct selector to the contactPage state domain
 */
const selectContactPageDomain = (state: any) =>
  state.contactPage || initialState;

/**
 * Default selector used by ContactPage
 */
export const makeSelectContactPage = () =>
  createSelector(
    selectContactPageDomain,
    substate => substate
  );

/*
 *
 * ContactPage actions
 *
 */

export function sendContactUs(data: any, action: any): ContactPageActionTypes {
  return {
    type: SEND_CONTACT_US,
    data,
    action
  };
}
