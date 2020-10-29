import React from 'react';

import { Link } from 'react-router-dom';

import { Button } from '@material-ui/core';

import LogoutForm from './LogoutForm';

export default function RightHeaderMenu({
  user, handleClickLogout,
}) {
  return (
    <>
      {user.uid ? (
        <>
          <Button color="inherit">
            <Link to="/newproduct">판매하기</Link>
          </Button>
          <LogoutForm onClick={handleClickLogout} />
        </>
      ) : (
        <>
          <Button color="inherit">
            <Link to="/login">Log In</Link>
          </Button>
          <Button color="inherit">
            <Link to="/signup">Sign up</Link>
          </Button>
        </>
      )}
    </>
  );
}
