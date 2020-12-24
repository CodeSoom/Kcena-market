import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import SignupForm from '../presentational/SignupForm';
import Loading from '../presentational/Loading';

import {
  requestSignup,
  setError,
} from '../../authSlice';

import { get } from '../../utils';

export default function SignupFormContainer() {
  const dispatch = useDispatch();

  const { error } = useSelector(get('authReducer'));
  const { isLoading } = useSelector(get('commonReducer'));

  useEffect(() => {
    dispatch(setError(''));
  }, []);

  function handleSubmit({ signupFields }) {
    dispatch(requestSignup({ signupFields }));
  }

  return (
    <>
      <SignupForm
        signupError={error}
        onSubmit={handleSubmit}
      />
      {isLoading && <Loading isLoading />}
    </>
  );
}
