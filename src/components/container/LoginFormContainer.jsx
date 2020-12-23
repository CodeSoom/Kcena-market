import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import LoginForm from '../presentational/LoginForm';
import Loading from '../presentational/Loading';

import {
  requestLogin,
  requestGoogleSignIn,
  setError,
} from '../../authSlice';

export default function LoginFormContainer() {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.authReducer.error);
  const isLoading = useSelector((state) => state.commonReducer.isLoading);

  useEffect(() => {
    dispatch(setError(''));
  }, []);

  function handleSubmit({ loginFields }) {
    dispatch(requestLogin({ loginFields }));
  }

  function handleSigninWithGoogle() {
    dispatch(requestGoogleSignIn());
  }

  return (
    <>
      <LoginForm
        loginError={error}
        onSubmit={handleSubmit}
        onGoogleSignIn={handleSigninWithGoogle}
      />
      {isLoading && <Loading isLoading />}
    </>
  );
}
