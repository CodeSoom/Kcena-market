import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import LoginForm from '../presentational/LoginForm';
import LogoutForm from '../presentational/LogoutForm';

import {
  changeLoginField,
  requestLogin,
  requestLogout,
} from '../../slice';

import { get } from '../../utils';

export default function LoginFormContainer() {
  const dispatch = useDispatch();

  const { email, password } = useSelector(get('loginFields'));
  const user = useSelector(get('user'));

  function handleChange({ name, value }) {
    dispatch(changeLoginField({ name, value }));
  }

  function handleSubmit() {
    dispatch(requestLogin());
  }

  function handleClickLogout() {
    dispatch(requestLogout());
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
        />
      )}
    </>
  );
}
