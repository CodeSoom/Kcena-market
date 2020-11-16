import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import SignupForm from '../presentational/SignupForm';

import {
  requestSignup,
  setError,
} from '../../authSlice';

export default function SignupFormContainer() {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.authReducer.error);

  useEffect(() => {
    dispatch(setError(''));
  }, []);

  function handleSubmit({ signupFields }) {
    dispatch(requestSignup({ signupFields }));
  }

  return (
    <SignupForm
      signupError={error}
      onSubmit={handleSubmit}
    />
  );
}
