import reducer from './reducer';

import {
  setItems,
} from './actions';

import items from '../fixtures/items';

describe('reducer', () => {
  context('when previous state is undefined', () => {
    const initialState = {
      items: [],
    };

    it('returns initialState', () => {
      const state = reducer(undefined, { type: 'action' });

      expect(state).toEqual(initialState);
    });
  });

  describe('setItems', () => {
    const initialState = {
      items: [],
    };

    it('changes items', () => {
      const state = reducer(initialState, setItems(items));

      expect(state.items).toEqual(items);
    });
  });
});
