import * as firebase from 'firebase';

import {
  postLogin,
  postGoogleSignIn,
  postSignup,
  postLogout,
  postProduct,
} from './api';

describe('firebase services', () => {
  describe('postLogin', () => {
    const mockPostLogin = ({ email, password }) => {
      firebase.auth()
        .signInWithEmailAndPassword = jest.fn().mockResolvedValue({
          email, password,
        });
    };

    const email = 'tester@example.com';
    const password = '123456';

    beforeEach(() => {
      mockPostLogin({ email, password });
    });

    it('returns uid', async () => {
      const user = await postLogin({ email, password });

      expect(user).toEqual({ email, password });
    });
  });

  describe('postGoogleSignIn', () => {
    const mockGoogleSignIn = ({ user }) => {
      firebase.auth()
        .signInWithPopup = jest.fn().mockResolvedValue(user);
    };

    const user = {
      displayName: 'tester',
      uid: 'abc1234',
    };

    beforeEach(() => {
      mockGoogleSignIn({ user });
    });

    it('returns uid', async () => {
      const mockUser = await postGoogleSignIn();

      expect(mockUser).toEqual({
        displayName: 'tester',
        uid: 'abc1234',
      });
    });
  });

  describe('postLogout', () => {
    const mockLogout = () => {
      firebase.auth()
        .signOut = jest.fn().mockResolvedValue(true);
    };

    beforeEach(() => {
      mockLogout();
    });

    it('returns promise', async () => {
      const logout = await postLogout();

      expect(logout).toBe(true);
    });
  });

  describe('postSignup', () => {
    const mockFirebaseSignup = ({ email, password }) => {
      firebase.auth()
        .createUserWithEmailAndPassword = jest.fn().mockResolvedValue({
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

  describe('postProduct', () => {
    const add = jest.fn((product) => product);
    const collection = jest.spyOn(
      firebase.firestore(), 'collection',
    ).mockReturnValue({ add });

    it('post new product', async () => {
      const newProduct = {
        title: 'test title',
        description: 'test description',
        productImages: [],
        createdAt: Date.now(),
        user: {
          uid: 'test1234',
          displayName: '홍 길동',
          email: 'tester@example.com',
        },
      };

      await postProduct(newProduct);

      expect(collection).toHaveBeenCalledWith('products');

      expect(add).toHaveBeenCalledWith(newProduct);
    });
  });
});
