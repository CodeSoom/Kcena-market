import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import SignupForm from '../presentational/SignupForm';

import {
  changeSignupField,
  requestSignup,
} from '../../authSlice';

import { get } from '../../utils';

export default function SignupFormContainer() {
  const dispatch = useDispatch();

  const {
    error,
    signupFields: {
      email, password,
    },
  } = useSelector(get('authReducer'));

  function handleChange({ name, value }) {
    dispatch(changeSignupField({ name, value }));
  }

  function handleSubmit() {
    dispatch(requestSignup());
  }

  return (
    <SignupForm
      fields={{ email, password }}
      onChange={handleChange}
      onSubmit={handleSubmit}
      error={error}
    />
  );
}
