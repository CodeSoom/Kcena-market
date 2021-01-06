import configureStore from 'redux-mock-store';
import { push } from 'connected-react-router';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

import authReducer, {
  setUser,
  setError,
  requestLogin,
  requestGoogleSignIn,
  requestLogout,
  requestSignup,
} from './authSlice';

import {
  postGoogleSignIn,
  postLogin,
  postSignup,
} from './services/api';

import { logInUser, logOutUser } from '../fixtures/user';
import { setIsLoading } from './commonSlice';

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

  beforeEach(() => {
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

  const loginFields = {
    email: 'ghdrlfehd@example.com',
    password: 'ghdrlfehd1234',
  };

  describe('requestLogin', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    it('dispatches requestLogin action and returns user', async () => {
      postLogin.mockImplementationOnce(() => logInUser);

      await store.dispatch(requestLogin({ loginFields }));

      const actions = store.getActions();

      expect(actions[0]).toEqual(setIsLoading(true));
      expect(actions[1]).toEqual(setUser(logInUser));
      expect(actions[2]).toEqual(setIsLoading(false));
      expect(actions[3]).toEqual(push('/'));
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

    context('when request success', () => {
      it('returns user and change url path', async () => {
        postGoogleSignIn.mockImplementationOnce(() => ({
          user: logInUser,
        }));

        await store.dispatch(requestGoogleSignIn());

        const actions = store.getActions();

        expect(actions[0]).toEqual(setIsLoading(true));
        expect(actions[1]).toEqual(setUser(logInUser));
        expect(actions[2]).toEqual(setIsLoading(false));
        expect(actions[3]).toEqual(push('/'));
      });
    });

    context('when request fail', () => {
      it('returns an error', async () => {
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
  });

  describe('requestSignup', () => {
    const signupFields = {
      firstName: '홍',
      lastName: '길동',
      email: 'ghdrlfehd@example.com',
      password: '1234abcd',
    };

    beforeEach(() => {
      store = mockStore({});
    });

    context('when request success', () => {
      it('returns user and change url path', async () => {
        const updateProfile = jest.fn();
        postSignup.mockImplementationOnce(() => ({
          ...logInUser,
          updateProfile,
        }));

        await store.dispatch(requestSignup({ signupFields }));

        const actions = store.getActions();

        expect(updateProfile).toHaveBeenCalledWith({
          displayName: logInUser.displayName,
        });
        expect(actions[0]).toEqual(setIsLoading(true));
        expect(actions[1]).toEqual(setUser(logInUser));
        expect(actions[2]).toEqual(setIsLoading(false));
        expect(actions[3]).toEqual(push('/'));
      });
    });

    context('when request fail', () => {
      it('returns an error', async () => {
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
  });

  describe('requestLogout', () => {
    beforeEach(() => {
      store = mockStore({
        authReducer: {
          user: logInUser,
        },
      });
    });

    it('dispatchs logout and change url path', async () => {
      await store.dispatch(requestLogout());

      const actions = store.getActions();

      expect(actions[0]).toEqual(setUser(logOutUser));
      expect(actions[1]).toEqual(push('/'));
    });
  });
});
