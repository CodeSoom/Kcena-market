import configureStore from 'redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

import authReducer, {
  setUser,
  setError,
  logout,
  requestLogin,
  requestGoogleSignIn,
  // requestLogout,
  requestSignup,
} from './authSlice';

import {
  postGoogleSignIn,
  postLogin,
  postSignup,
} from './services/api';

import { logInUser, logOutUser } from '../fixtures/user';

const middlewares = [...getDefaultMiddleware()];
const mockStore = configureStore(middlewares);

jest.mock('./services/api');
jest.mock('connected-react-router');

describe('reducer', () => {
  context('when previous state is undefined', () => {
    const initialState = {
      user: logOutUser,
      error: '',
    };

    it('returns initialState', () => {
      const state = authReducer(undefined, { type: 'action' });

      expect(state).toEqual(initialState);
    });
  });

  describe('setUser', () => {
    const initialState = {
      user: logOutUser,
    };

    it('save log in user', () => {
      const state = authReducer(initialState, setUser(logInUser));

      expect(state.user.email).toBe(logInUser.email);
      expect(state.user.displayName).toBe(logInUser.displayName);
      expect(state.user.uid).toBe(logInUser.uid);
    });
  });

  describe('logout', () => {
    it('clears user', () => {
      const initialState = {
        user: logInUser,
      };

      const state = authReducer(initialState, logout());

      expect(state.user.email).toBe('');
      expect(state.user.displayName).toBe('');
      expect(state.user.uid).toBe('');
    });
  });

  describe('setError', () => {
    it('change error', () => {
      const initialState = {
        error: '',
      };

      const state = authReducer(initialState, setError(
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

  const loginFields = {
    email: 'tester@example.com',
    password: '1234abcd',
  };

  describe('requestLogin', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    it('dispatches requestLogin action and returns user', async () => {
      postLogin.mockImplementationOnce(() => ({
        user: logInUser,
      }));

      await store.dispatch(requestLogin({ loginFields }));

      const actions = store.getActions();

      expect(actions[0]).toEqual(setUser(logInUser));
    });

    it('dispatches requestLogin action and returns an error', async () => {
      postLogin.mockImplementationOnce(
        () => Promise.reject(
          new Error('something bad happened'),
        ),
      );

      try {
        await store.dispatch(requestLogin({ loginFields }));
      } catch {
        const actions = store.getActions();

        expect(actions[0].payload.error).toEqual('Something bad happened');
      }
    });
  });

  describe('requestGoogleSignIn', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    it('dispatches requestGoogleSignIn action and returns user', async () => {
      postGoogleSignIn.mockImplementationOnce(() => ({
        user: logInUser,
      }));

      await store.dispatch(requestGoogleSignIn());

      const actions = store.getActions();

      expect(actions[0]).toEqual(setUser(logInUser));
    });

    it('dispatches requestGoogleSignIn action and returns an error', async () => {
      postGoogleSignIn.mockImplementationOnce(
        () => Promise.reject(
          new Error('something bad happened'),
        ),
      );

      try {
        await store.dispatch(requestGoogleSignIn());
      } catch {
        const actions = store.getActions();
        expect(actions[0].payload.error).toEqual('Something bad happened');
      }
    });
  });

  describe('requestSignup', () => {
    const signupFields = {
      firstName: '홍',
      lastName: '길동',
      email: 'tester@example.com',
      password: '1234abcd',
    };

    beforeEach(() => {
      store = mockStore({});
    });

    it('dispatches requestSignup action and returns user', async () => {
      postSignup.mockImplementationOnce(() => ({
        user: {
          ...logInUser,
          updateProfile: jest.fn(),
        },
      }));

      await store.dispatch(requestSignup({ signupFields }));

      const actions = store.getActions();
      expect(actions[0]).toEqual(setUser(logInUser));
    });

    it('dispatches requestSignup action and returns an error', async () => {
      postSignup.mockImplementationOnce(
        () => Promise.reject(
          new Error('something bad happened'),
        ),
      );

      try {
        await store.dispatch(requestSignup({ signupFields }));
      } catch {
        const actions = store.getActions();
        expect(actions[0].payload.error).toEqual('Something bad happened');
      }
    });
  });

  // TODO: connected-react-router push가 제대로 mocking이 안됨.
  // describe('requestLogout', () => {
  //   beforeEach(() => {
  //     store = mockStore({
  //       authReducer: {
  //         user: {
  //           displayName: 'tester',
  //           uid: '123456',
  //         },
  //       },
  //     });
  //   });

  //   it('dispatchs logout', async () => {
  //     await store.dispatch(requestLogout());

  //     const actions = store.getActions();

  //     expect(actions[0]).toEqual(logout());
  //   });
  // });
});
