import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import LoginForm from '../presentational/LoginForm';
import LogoutForm from '../presentational/LogoutForm';

import {
  changeLoginField,
  requestLogin,
  requestGoogleSignIn,
  requestLogout,
} from '../../slice';

import { get } from '../../utils';

export default function LoginFormContainer() {
  const dispatch = useDispatch();

  const { email, password } = useSelector(get('loginFields'));
  const user = useSelector(get('user'));
  const error = useSelector(get('error'));

  function handleChange({ name, value }) {
    dispatch(changeLoginField({ name, value }));
  }

  function handleSubmit() {
    dispatch(requestLogin());
  }

  function handleClickLogout() {
    dispatch(requestLogout());
  }

  function handleSigninWithGoogle() {
    dispatch(requestGoogleSignIn());
  }

  return (
    <>
      {user.uid ? (
        <LogoutForm onClick={handleClickLogout} />
      ) : (
        <LoginForm
          fields={{ email, password }}
          onChange={handleChange}
          onSubmit={handleSubmit}
          error={error}
          onGoogleSignin={handleSigninWithGoogle}
        />
      )}
    </>
  );
}
