import reducer from './reducer';

import {
  setProducts,
} from './actions';

import products from '../fixtures/products';

describe('reducer', () => {
  context('when previous state is undefined', () => {
    const initialState = {
      products: [],
    };

    it('returns initialState', () => {
      const state = reducer(undefined, { type: 'action' });

      expect(state).toEqual(initialState);
    });
  });

  describe('setProducts', () => {
    const initialState = {
      products: [],
    };

    it('changes products', () => {
      const state = reducer(initialState, setProducts(products));

      expect(state.products).toEqual(products);
    });
  });
});
