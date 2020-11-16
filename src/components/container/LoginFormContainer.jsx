import React from 'react';

import { useDispatch } from 'react-redux';

import LoginForm from '../presentational/LoginForm';

import {
  requestLogin,
  requestGoogleSignIn,
} from '../../authSlice';

export default function LoginFormContainer() {
  const dispatch = useDispatch();

  function handleSubmit({ loginFields }) {
    dispatch(requestLogin({ loginFields }));
  }

  function handleSigninWithGoogle() {
    dispatch(requestGoogleSignIn());
  }

  return (
    <LoginForm
      onSubmit={handleSubmit}
      onGoogleSignIn={handleSigninWithGoogle}
    />
  );
}
