import produce from 'immer';
import mePageReducer , {defaultAction,DEFAULT_ACTION} from '../ducks';

/* eslint-disable default-case, no-param-reassign */
describe('mePageReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      // default state params here
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(mePageReducer(undefined, {})).toEqual(expectedResult);
  });

  /**
   * Example state change comparison
   *
   * it('should handle the defaultAction action correctly', () => {
   *   const expectedResult = produce(state, draft => {
   *     draft.loading = true;
   *     draft.error = false;
   *     draft.loaded = false;
   *   });
   *
   *   expect(appReducer(state, defaultAction())).toEqual(expectedResult);
   * });
   */
});



describe('selectMePageDomain', () => {
  it('Expect to have unit tests specified', () => {
    expect(true).toEqual(false);
  });
});


describe('MePage actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });
  });
});
