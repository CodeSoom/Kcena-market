import * as firebase from 'firebase';
import {
  fetchProducts,
  fetchProduct,
  postLogin,
  postLogout,
} from './api';

import mockProducts from '../../fixtures/products';

describe('product api', () => {
  const mockFetch = (data) => {
    global.fetch = jest.fn().mockResolvedValue({
      async json() { return data; },
    });
  };

  describe('fetchProducts', () => {
    beforeEach(() => {
      mockFetch(mockProducts);
    });

    it('returns products', async () => {
      const products = await fetchProducts();

      expect(products).toEqual(mockProducts);
    });
  });

  describe('fetchProduct', () => {
    beforeEach(() => {
      mockFetch(mockProducts[0]);
    });

    it('returns product', async () => {
      const product = await fetchProduct();

      expect(product).toEqual(mockProducts[0]);
    });
  });
});

describe('firebase services', () => {
  const mockFirebaseLogin = ({ email, password }) => {
    firebase.auth().signInWithEmailAndPassword = jest.fn()
      .mockResolvedValue({
        email, password,
      });
  };

  describe('postLogin', () => {
    const email = 'tester@example.com';
    const password = '123456';

    beforeEach(() => {
      mockFirebaseLogin({ email, password });
    });

    it('returns uid', async () => {
      const user = await postLogin({ email, password });

      expect(user).toEqual({ email, password });
    });
  });

  describe('postLogout', () => {
    const mockFirebaseLogout = () => {
      firebase.auth().signOut = jest.fn()
        .mockResolvedValue(
          Promise.resolve(true),
        );
    };

    beforeEach(() => {
      mockFirebaseLogout();
    });

    it('returns promise', async () => {
      const logout = await postLogout();

      expect(logout).toBe(true);
    });
  });
});
