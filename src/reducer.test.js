import reducer from './reducer';

import {
  setProducts,
  setProduct,
} from './actions';

import products from '../fixtures/products';

describe('reducer', () => {
  context('when previous state is undefined', () => {
    const initialState = {
      product: null,
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

  describe('setProduct', () => {
    const initialState = {
      product: null,
    };

    const product = products[0];

    const state = reducer(initialState, setProduct(product));

    expect(state.product.id).toBe(1);
    expect(state.product.title).toBe('크리넥스 KF-AD 소형 마스크 팝니다.');
  });
});
