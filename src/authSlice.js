import { createSlice } from '@reduxjs/toolkit';

import { push } from 'connected-react-router';

import { saveItem, deleteItem } from './services/storage';

import {
  postLogin,
  postGoogleSignIn,
  postSignup,
  postLogout,
} from './services/api';

const initialUser = {
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
    setUser(state, { payload: { displayName, uid } }) {
      return {
        ...state,
        user: {
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
      const { user } = await postLogin({ email, password });
      const { displayName, uid } = user;

      dispatch(setUser({ displayName, uid }));
      saveItem('user', { displayName, uid });
      dispatch(push('/'));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
}

export function requestGoogleSignIn() {
  return async (dispatch) => {
    try {
      const { user } = await postGoogleSignIn();
      const { displayName, uid } = user;

      dispatch(setUser({ displayName, uid }));
      saveItem('user', { displayName, uid });
      dispatch(push('/'));
    } catch (error) {
      dispatch(setError(error.message));
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
      const { user } = await postSignup({ email, password });
      user.updateProfile({
        displayName: userNickname,
      });

      const { displayName, uid } = user;
      dispatch(setUser({ displayName, uid }));
      saveItem('user', { displayName, uid });
      dispatch(push('/'));
    } catch (error) {
      dispatch(setError(error.message));
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
