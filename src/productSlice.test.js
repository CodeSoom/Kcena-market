import configureStore from 'redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

import productReducer, {
  loadInitProducts,
  loadProduct,
  postProduct,
  setProduct,
  setProducts,
  setMyProducts,
} from './productSlice';

import products from '../fixtures/products';
import newProduct from '../fixtures/newProduct';

const middlewares = [...getDefaultMiddleware()];
const mockStore = configureStore(middlewares);

jest.mock('./services/api');

describe('productReducer', () => {
  context('when previous state is undefined', () => {
    const initialState = {
      product: null,
      products: [],
      userProducts: [],
    };

    it('returns initialState', () => {
      const state = productReducer(undefined, { type: 'action' });

      expect(state).toEqual(initialState);
    });
  });

  describe('setProducts', () => {
    const initialState = {
      products: [],
    };

    it('changes products', () => {
      const state = productReducer(initialState, setProducts(products));

      expect(state.products).toEqual(products);
    });
  });

  describe('setProduct', () => {
    const initialState = {
      product: null,
    };

    const product = products[0];

    const state = productReducer(initialState, setProduct(product));

    expect(state.product.id).toBe(1);
    expect(state.product.title).toBe('크리넥스 KF-AD 소형 마스크 팝니다.');
  });

  describe('setMyProducts', () => {
    const initialState = {
      myProducts: [],
    };

    const state = productReducer(initialState, setMyProducts(products));

    expect(state.myProducts).toEqual(products);
  });
});

describe('actions', () => {
  let store;

  describe('loadInitProducts', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    it('runs setProducts', async () => {
      await store.dispatch(loadInitProducts());

      const actions = store.getActions();

      expect(actions[0]).toEqual(setProducts([]));
    });
  });

  describe('loadProduct', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    it('dispatchs setProduct', async () => {
      await store.dispatch(loadProduct({ productId: 1 }));

      const actions = store.getActions();

      expect(actions[0]).toEqual(setProduct({}));
    });
  });

  describe('postProduct', () => {
    beforeEach(() => {
      store = mockStore({
        authReducer: {
          user: {
            uid: '1234',
          },
        },
      });
    });

    it('dispatchs', async () => {
      const files = [];

      await store.dispatch(postProduct({ files, newProduct }));
    });
  });
});
