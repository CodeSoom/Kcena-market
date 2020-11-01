import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import LoginForm from '../presentational/LoginForm';

import {
  changeLoginField,
  requestLogin,
  requestGoogleSignIn,
} from '../../authSlice';

import { get } from '../../utils';

export default function LoginFormContainer() {
  const dispatch = useDispatch();

  const {
    error,
    loginFields: {
      email, password,
    },
  } = useSelector(get('authReducer'));

  function handleChange({ name, value }) {
    dispatch(changeLoginField({ name, value }));
  }

  function handleSubmit() {
    dispatch(requestLogin());
  }

  function handleSigninWithGoogle() {
    dispatch(requestGoogleSignIn());
  }

  return (
    <LoginForm
      fields={{ email, password }}
      onChange={handleChange}
      onSubmit={handleSubmit}
      error={error}
      onGoogleSignIn={handleSigninWithGoogle}
    />
  );
}
