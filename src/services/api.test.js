import * as firebase from 'firebase';
import {
  fetchProducts,
  fetchProduct,
  postLogin,
  postSignup,
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
  describe('postLogin', () => {
    const mockFirebaseLogin = ({ email, password }) => {
      firebase.auth().signInWithEmailAndPassword = jest.fn()
        .mockResolvedValue({
          email, password,
        });
    };

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

  describe('postSignup', () => {
    const mockFirebaseSignup = ({ email, password }) => {
      firebase.auth().createUserWithEmailAndPassword = jest.fn()
        .mockResolvedValue({
          displayName: '',
          email,
          password,
          uid: '',
        });
    };

    const email = 'tester@example.com';
    const password = '123456';

    beforeEach(() => {
      mockFirebaseSignup({ email, password });
    });

    it('returns new account', async () => {
      const newUser = await postSignup({ email, password });

      expect(newUser.email).toBe(email);
    });
  });
});
