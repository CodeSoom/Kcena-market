import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import SignupForm from '../presentational/SignupForm';
import LogoutForm from '../presentational/LogoutForm';

import {
  changeSignupField,
  requestSignup,
  requestLogout,
} from '../../slice';

import { get } from '../../utils';

export default function SignupFormContainer() {
  const dispatch = useDispatch();

  const { email, password } = useSelector(get('signupFields'));
  const user = useSelector(get('user'));
  const error = useSelector(get('error'));

  function handleChange({ name, value }) {
    dispatch(changeSignupField({ name, value }));
  }

  function handleSubmit() {
    dispatch(requestSignup());
  }

  function handleClickLogout() {
    dispatch(requestLogout());
  }

  return (
    <>
      {user.uid ? (
        <LogoutForm onClick={handleClickLogout} />
      ) : (
        <SignupForm
          fields={{ email, password }}
          onChange={handleChange}
          onSubmit={handleSubmit}
          error={error}
        />
      )}
    </>
  );
}
