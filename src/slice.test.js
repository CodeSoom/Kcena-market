import configureStore from 'redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

import reducer, {
  loadInitProducts,
  loadProduct,
  setProduct,
  setProducts,
  changeLoginField,
  changeSignupField,
  setUser,
  setError,
  logout,
  requestLogin,
  requestLogout,
  requestSignup,
} from './slice';

import products from '../fixtures/products';
import { postLogin, postSignup } from './services/api';

const middlewares = [...getDefaultMiddleware()];
const mockStore = configureStore(middlewares);

jest.mock('./services/api');

describe('reducer', () => {
  context('when previous state is undefined', () => {
    const initialState = {
      product: null,
      products: [],
      loginFields: {
        email: '',
        password: '',
      },
      signupFields: {
        email: '',
        password: '',
      },
      user: {
        displayName: '',
        uid: '',
      },
      error: '',
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

  describe('changeLoginField', () => {
    context('when email is changed', () => {
      const initialState = {
        loginFields: {
          email: 'email',
          password: 'password',
        },
      };

      it('change email', () => {
        const state = reducer(initialState, changeLoginField({
          name: 'email',
          value: 'test',
        }));

        expect(state.loginFields.email).toBe('test');
        expect(state.loginFields.password).toBe('password');
      });
    });

    context('when password is changed', () => {
      const initialState = {
        loginFields: {
          email: 'email',
          password: 'password',
        },
      };

      it('change password', () => {
        const state = reducer(initialState, changeLoginField({
          name: 'password',
          value: 'test',
        }));

        expect(state.loginFields.email).toBe('email');
        expect(state.loginFields.password).toBe('test');
      });
    });
  });

  describe('changeSignupField', () => {
    context('when email is changed', () => {
      const initialState = {
        signupFields: {
          email: 'email',
          password: 'password',
        },
      };

      it('change email', () => {
        const state = reducer(initialState, changeSignupField({
          name: 'email',
          value: 'test',
        }));

        expect(state.signupFields.email).toBe('test');
        expect(state.signupFields.password).toBe('password');
      });
    });

    context('when password is changed', () => {
      const initialState = {
        signupFields: {
          email: 'email',
          password: 'password',
        },
      };

      it('change password', () => {
        const state = reducer(initialState, changeSignupField({
          name: 'password',
          value: 'test',
        }));

        expect(state.signupFields.email).toBe('email');
        expect(state.signupFields.password).toBe('test');
      });
    });
  });

  describe('setUser', () => {
    const initialState = {
      user: {
        displayName: '',
        uid: '',
      },
    };

    it('save log in user', () => {
      const state = reducer(initialState, setUser({
        displayName: 'tester',
        uid: 'testuid12345',
      }));

      expect(state.user.displayName).toBe('tester');
      expect(state.user.uid).toBe('testuid12345');
    });
  });

  describe('logout', () => {
    it('clears user', () => {
      const initialState = {
        user: {
          displayName: 'tester',
          uid: '123456',
        },
      };

      const state = reducer(initialState, logout());

      expect(state.user.displayName).toBe('');
      expect(state.user.uid).toBe('');
    });
  });

  describe('setError', () => {
    it('change error', () => {
      const initialState = {
        error: '',
      };

      const state = reducer(initialState, setError(
        'The email address is already in use by another account.',
      ));

      expect(state.error).toBe(
        'The email address is already in use by another account.',
      );
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

  describe('requestLogin', () => {
    beforeEach(() => {
      store = mockStore({
        loginFields: {
          email: '',
          password: '',
        },
      });
    });

    it('dispatches requestLogin action and returns user', async () => {
      postLogin.mockImplementationOnce(() => ({
        user: {},
      }));

      await store.dispatch(requestLogin({}));

      const actions = store.getActions();
      expect(actions[0]).toEqual(setUser({}));
    });

    it('dispatches requestLogin action and returns an error', async () => {
      postLogin.mockImplementationOnce(
        () => Promise.reject(
          new Error('something bad happened'),
        ),
      );

      try {
        await store.dispatch(requestLogin());
      } catch {
        const actions = store.getActions();
        expect(actions[0].payload.error).toEqual('Something bad happened');
      }
    });
  });

  describe('requestSignup', () => {
    beforeEach(() => {
      store = mockStore({
        signupFields: {
          email: '',
          password: '',
        },
      });
    });

    it('dispatches requestSignup action and returns user', async () => {
      postSignup.mockImplementationOnce(() => ({
        user: {},
      }));

      await store.dispatch(requestSignup({}));

      const actions = store.getActions();
      expect(actions[0]).toEqual(setUser({}));
    });

    it('dispatches requestSignup action and returns an error', async () => {
      postSignup.mockImplementationOnce(
        () => Promise.reject(
          new Error('something bad happened'),
        ),
      );

      try {
        await store.dispatch(requestSignup());
      } catch {
        const actions = store.getActions();
        expect(actions[0].payload.error).toEqual('Something bad happened');
      }
    });
  });

  describe('requestLogout', () => {
    beforeEach(() => {
      store = mockStore({
        user: {
          displayName: 'tester',
          uid: '123456',
        },
      });
    });

    it('dispatchs logout', async () => {
      await store.dispatch(requestLogout());

      const actions = store.getActions();

      expect(actions[0]).toEqual(logout());
    });
  });
});
