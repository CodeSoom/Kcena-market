import { createSlice } from '@reduxjs/toolkit';

import { push } from 'connected-react-router';

import { saveItem, deleteItem } from './services/storage';

import { setIsLoading } from './commonSlice';

import {
  postLogin,
  postGoogleSignIn,
  postSignup,
  postLogout,
} from './services/api';

const initialUser = {
  email: '',
  displayName: '',
  uid: '',
};

const { actions, reducer: authReducer } = createSlice({
  name: 'authentication',
  initialState: {
    user: {
      ...initialUser,
    },
    error: '',
  },
  reducers: {
    setUser(state, { payload: { email, displayName, uid } }) {
      return {
        ...state,
        user: {
          email,
          displayName,
          uid,
        },
      };
    },
    setError(state, { payload: error }) {
      return {
        ...state,
        error,
      };
    },
    logout(state) {
      return {
        ...state,
        user: {
          ...initialUser,
        },
      };
    },
  },
});

export const {
  setUser,
  setError,
  logout,
} = actions;

export function requestLogin({ loginFields }) {
  const { email, password } = loginFields;

  return async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const { user } = await postLogin({ email, password });
      const { displayName, uid } = user;

      dispatch(setUser({ email, displayName, uid }));
      saveItem('user', { email, displayName, uid });
      dispatch(setIsLoading(false));

      dispatch(push('/'));
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setIsLoading(false));
    }
  };
}

export function requestGoogleSignIn() {
  return async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const { user } = await postGoogleSignIn();
      const { email, displayName, uid } = user;

      dispatch(setUser({ email, displayName, uid }));
      saveItem('user', { email, displayName, uid });
      dispatch(setIsLoading(false));

      dispatch(push('/'));
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setIsLoading(false));
    }
  };
}

export function requestSignup({ signupFields }) {
  const {
    email, password, firstName, lastName,
  } = signupFields;
  const userNickname = `${firstName} ${lastName}`;

  return async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const { user } = await postSignup({ email, password });
      user.updateProfile({
        displayName: userNickname || 'unknown',
      });

      const { displayName, uid } = user;
      dispatch(setUser({ email, displayName, uid }));
      saveItem('user', { email, displayName, uid });
      dispatch(setIsLoading(false));

      dispatch(push('/'));
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setIsLoading(false));
    }
  };
}

export function requestLogout() {
  return async (dispatch) => {
    await postLogout();

    dispatch(logout());
    dispatch(push('/'));
    deleteItem('user');
  };
}

export default authReducer;
