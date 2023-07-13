import { createSelector } from 'reselect';
import produce from 'immer';
import {
  initialStateAboutHakeemyPageType,
  AboutHakeemyPageActionTypes
} from './types';


/*
 *
 * AboutHakeemyPage constants
 *
 */
export const DEFAULT_ACTION = 'app/AboutHakeemyPage/DEFAULT_ACTION';


/*
 *
 * AboutHakeemyPage reducer
 *
 */
export const initialState : initialStateAboutHakeemyPageType = {
  error: '',
  loaded: false,
  loading: false,
};

export default (state = initialState, action: AboutHakeemyPageActionTypes) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
    }
  });

/**
 * Direct selector to the aboutHakeemyPage state domain
 */
const selectAboutHakeemyPageDomain = state => state.aboutHakeemyPage || initialState;

/**
 * Default selector used by AboutHakeemyPage
 */
export const makeSelectAboutHakeemyPage = () =>
  createSelector(selectAboutHakeemyPageDomain, substate => substate);


/*
 *
 * AboutHakeemyPage actions
 *
 */
export function defaultAction():AboutHakeemyPageActionTypes {
  return {
    type: DEFAULT_ACTION,
  };
}
