import configureStore from 'redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

import productReducer, {
  loadInitProducts,
  loadProduct,
  postProduct,
  setProduct,
  setInitialProduct,
  addProductImages,
  deleteProductImage,
  setProducts,
  setloggedInUserSellProducts,
  deleteProduct,
} from './productSlice';

import products from '../fixtures/products';
import loggedInUserSellProducts from '../fixtures/loggedInUserSellProducts';
import newProduct from '../fixtures/newProduct';
import productImages from '../fixtures/productImages';
import { logInUser } from '../fixtures/user';

const middlewares = [...getDefaultMiddleware()];
const mockStore = configureStore(middlewares);
const initialProduct = {
  title: '',
  description: '',
  category: '',
  region: '',
  price: '',
  productImages: [],
  user: {},
  createAt: '',
};

jest.mock('./services/api');

describe('productReducer', () => {
  context('when previous state is undefined', () => {
    const initialState = {
      product: initialProduct,
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
      product: initialProduct,
    };

    const product = products[0];

    const state = productReducer(initialState, setProduct(product));

    expect(state.product.id).toBe(1);
    expect(state.product.title).toBe('크리넥스 KF-AD 소형 마스크 팝니다.');
  });

  describe('addProductImages', () => {
    const initialState = {
      product: initialProduct,
    };

    const state = productReducer(initialState, addProductImages(productImages));

    expect(state.product.productImages).toEqual(productImages);
  });

  describe('deleteProductImage', () => {
    const originProductImages = productImages;
    const initialState = {
      product: {
        productImages: originProductImages,
      },
    };

    const selectedImageUrl = 'testImageUrl1';
    const state = productReducer(initialState, deleteProductImage(selectedImageUrl));

    expect(state.product.productImages).toEqual([
      { name: 'test2', imageUrl: 'testImageUrl2' },
      { name: 'test3', imageUrl: 'testImageUrl3' },
    ]);
  });

  describe('setInitialProduct', () => {
    const initialState = {
      product: products[0],
    };

    const state = productReducer(initialState, setInitialProduct());

    expect(state.product).toEqual(initialProduct);
  });

  describe('setloggedInUserSellProducts', () => {
    const initialState = {
      loggedInUserSellProducts: [],
    };

    const state = productReducer(
      initialState,
      setloggedInUserSellProducts(loggedInUserSellProducts),
    );

    expect(state.loggedInUserSellProducts).toEqual(loggedInUserSellProducts);
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
          user: logInUser,
        },
        productReducer: {
          product: { productImages },
        },
      });
    });

    it('dispatchs', async () => {
      const files = [];

      await store.dispatch(postProduct({ files, newProduct }));
    });
  });

  describe('deleteProduct', () => {
    const productWillDeleted = loggedInUserSellProducts[0];

    beforeEach(() => {
      store = mockStore({
        productReducer: {
          loggedInUserSellProducts,
        },
      });
    });

    it('dispatch setloggedInUserSellProducts', async () => {
      await store.dispatch(deleteProduct({ product: productWillDeleted }));

      const actions = store.getActions();

      expect(actions[0]).toEqual(setloggedInUserSellProducts(
        loggedInUserSellProducts.filter((product) => product.id !== productWillDeleted.id),
      ));
    });
  });
});
