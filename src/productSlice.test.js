import configureStore from 'redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

import productReducer, {
  loadInitProducts,
  loadProduct,
  postProduct,
  setProduct,
  setProducts,
  writeNewProduct,
  initialNewProduct,
} from './productSlice';

import products from '../fixtures/products';

const middlewares = [...getDefaultMiddleware()];
const mockStore = configureStore(middlewares);

jest.mock('./services/api');

describe('productReducer', () => {
  context('when previous state is undefined', () => {
    const initialState = {
      product: null,
      products: [],
      newProduct: {
        title: '',
        description: '',
        price: '',
        region: '',
      },
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

  describe('writeNewProduct', () => {
    context('when title is changed', () => {
      const initialState = {
        newProduct: {
          title: 'old title',
          description: '아이패드 3세대 12인치 256기가 팝니다.',
          price: '10000',
          region: '인천',
        },
      };

      it('change title', () => {
        const state = productReducer(initialState, writeNewProduct({
          name: 'title',
          value: 'new title',
        }));

        expect(state.newProduct.title).toBe('new title');
        expect(state.newProduct.description).toBe('아이패드 3세대 12인치 256기가 팝니다.');
      });
    });

    context('when description is changed', () => {
      const initialState = {
        newProduct: {
          title: '아이패드',
          description: 'old description',
          price: '10000',
          region: '인천',
        },
      };

      it('change description', () => {
        const state = productReducer(initialState, writeNewProduct({
          name: 'description',
          value: 'new description',
        }));

        expect(state.newProduct.title).toBe('아이패드');
        expect(state.newProduct.description).toBe('new description');
      });
    });
  });

  describe('initialNewProduct', () => {
    it('initialization new product field', () => {
      const initialState = {
        newProduct: {
          title: '아이패드',
          description: 'old description',
          price: '10000',
          region: '인천',
        },
      };

      const state = productReducer(initialState, initialNewProduct());

      expect(state.newProduct.title).toBe('');
    });
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
        productReducer: {
          newProduct: {
            title: 'iPhone',
            description: '팝니다.',
          },
        },
      });
    });

    it('dispatchs', async () => {
      await store.dispatch(postProduct());

      const actions = store.getActions();

      expect(actions[0]).toEqual(initialNewProduct());
    });
  });
});
