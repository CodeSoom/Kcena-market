import React from 'react';
import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

const Wrapper = styled.header({
  fontFamily: 'Baloo, cursive',
  display: 'flex',
  position: 'fixed',
  justifyContent: 'center',
  alignItems: 'center',
  height: '75px',
  width: '100vw',
  fontSize: '2.5rem',
  backgroundColor: '#fff',
  zIndex: '100',
  top: '0px',
  boxShadow: '0 3px 6px rgba(0,0,0,0.10), 0 3px 6px rgba(0,0,0,0.20)',
  '& a': {
    color: '#555',
    textDecoration: 'none',
    '&:hover': {
      color: '#000',
    },
  },
});

const Container = styled.div({
  display: 'flex',
  width: '1024px',
  justifyContent: 'space-between',
});

const UserAuthBox = styled.div({
  fontSize: '1.2rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& a': {
    paddingRight: '10px',
  },
});

export default function Header() {
  return (
    <Wrapper>
      <Container>
        <Link to="/">Kcena Market</Link>
        <UserAuthBox>
          <Link to="/login">Log In</Link>
          <Link to="/signup">Sign up</Link>
        </UserAuthBox>
      </Container>
    </Wrapper>
  );
}
