import configureStore from 'redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';

import productReducer, {
  loadInitProducts,
  loadProduct,
  createPost,
  editPost,
  deletePost,
  setProduct,
  setInitialProduct,
  deleteProductImage,
  setProducts,
  setUserProducts,
} from './productSlice';
import { setIsLoading } from './commonSlice';

import { postProduct } from './services/api';

import products from '../fixtures/products';
import userProducts from '../fixtures/userProducts';
import product from '../fixtures/product';
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
jest.mock('connected-react-router');

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

    it('changes product', () => {
      const state = productReducer(initialState, setProduct(product));

      expect(state.product.title).toBe(product.title);
    });
  });

  describe('deleteProductImage', () => {
    const originProductImages = productImages;
    const initialState = {
      product: {
        productImages: originProductImages,
      },
    };

    it('delete images', () => {
      const selectedImageUrl = 'testImageUrl1';
      const state = productReducer(initialState, deleteProductImage(selectedImageUrl));

      expect(state.product.productImages).toEqual([
        { name: 'test2', imageUrl: 'testImageUrl2' },
        { name: 'test3', imageUrl: 'testImageUrl3' },
      ]);
    });
  });

  describe('setInitialProduct', () => {
    const initialState = {
      product: products[0],
    };

    it('initialize product', () => {
      const state = productReducer(initialState, setInitialProduct());

      expect(state.product).toEqual(initialProduct);
    });
  });

  describe('setUserProducts', () => {
    const initialState = {
      userProducts: [],
    };

    it('set current user products', () => {
      const state = productReducer(
        initialState,
        setUserProducts(userProducts),
      );

      expect(state.userProducts).toEqual(userProducts);
    });
  });
});

describe('actions', () => {
  let store;

  beforeEach(() => {
    postProduct.mockResolvedValue('randomProductId');
    push.mockImplementation((pathname) => ({
      type: 'LOCATION_CHANGE',
      payload: {
        location: {
          pathname,
        },
        action: 'PUSH',
      },
    }));
  });

  describe('loadInitProducts', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    it('fetch initial product and dispatchs setProducts ', async () => {
      await store.dispatch(loadInitProducts());

      const actions = store.getActions();

      expect(actions[0]).toEqual(setIsLoading(true));
      expect(actions[1]).toEqual(setProducts([]));
      expect(actions[2]).toEqual(setIsLoading(false));
    });
  });

  describe('loadProduct', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    it('fetch product dispatchs setProduct', async () => {
      await store.dispatch(loadProduct({ productId: 1 }));

      const actions = store.getActions();

      expect(actions[0]).toEqual(setProduct({}));
    });
  });

  describe('createPost', () => {
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

    it('post product and render product detail page', async () => {
      const files = [];

      await store.dispatch(createPost({ files, product }));

      const actions = store.getActions();

      expect(actions[0]).toEqual(setIsLoading(true));
      expect(actions[1]).toEqual(setIsLoading(false));
      expect(actions[2]).toEqual(push('/products/randomProductId'));
    });
  });

  describe('editPost', () => {
    beforeEach(() => {
      store = mockStore({
        productReducer: {
          product: products[0],
        },
      });
    });

    it('edit product and render product detail page', async () => {
      const files = ['newImage1', 'newImage2'];
      const toBeDeletedUrls = [];
      const productId = 'mockUrl';

      await store.dispatch(editPost({
        files, toBeDeletedUrls, productId, newProduct: product,
      }));

      const actions = store.getActions();

      expect(actions[0]).toEqual(setIsLoading(true));
      expect(actions[1]).toEqual(setIsLoading(false));
      expect(actions[2]).toEqual(push(`/products/${productId}`));
    });
  });

  describe('deletePost', () => {
    const productWillDeleted = userProducts[0];

    beforeEach(() => {
      store = mockStore({
        productReducer: {
          userProducts,
        },
      });
    });

    it('delete product and dispatch setUserProducts', async () => {
      await store.dispatch(deletePost({ product: productWillDeleted }));

      const actions = store.getActions();

      expect(actions[0]).toEqual(setUserProducts(
        userProducts.filter((userProduct) => userProduct.id !== productWillDeleted.id),
      ));
    });
  });
});
