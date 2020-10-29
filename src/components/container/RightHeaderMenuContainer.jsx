import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { requestLogout } from '../../authSlice';

import RightHeaderMenu from '../presentational/RightHeaderMenu';

export default function RightHeaderMenuContainer() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.authReducer.user);

  function handleClickLogout() {
    dispatch(requestLogout());
  }

  return (
    <>
      <RightHeaderMenu
        user={user}
        handleClickLogout={handleClickLogout}
      />
    </>
  );
}
