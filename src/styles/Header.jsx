import React from 'react';

import styled from '@emotion/styled';

const Wrapper = styled.header({
  fontFamily: 'Baloo, cursive',
  display: 'flex',
  position: 'fixed',
  justifyContent: 'center',
  alignItems: 'center',
  height: '75px',
  width: '100%',
  fontSize: '2.5rem',
  backgroundColor: '#fff',
  zIndex: '100',
  top: '0px',
  boxShadow: '0 3px 6px rgba(0,0,0,0.10), 0 3px 6px rgba(0,0,0,0.20)',
});

const Header = () => (
  <Wrapper>
    Kcena Market
  </Wrapper>
);

export default Header;
