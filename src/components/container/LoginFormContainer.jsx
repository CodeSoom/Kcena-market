import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import LoginForm from '../presentational/LoginForm';

import {
  requestLogin,
  requestGoogleSignIn,
} from '../../authSlice';

export default function LoginFormContainer() {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.authReducer.error);

  function handleSubmit({ loginFields }) {
    dispatch(requestLogin({ loginFields }));
  }

  function handleSigninWithGoogle() {
    dispatch(requestGoogleSignIn());
  }

  return (
    <LoginForm
      loginError={error}
      onSubmit={handleSubmit}
      onGoogleSignIn={handleSigninWithGoogle}
    />
  );
}
