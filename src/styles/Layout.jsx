import React from 'react';

import facepaint from 'facepaint';

import styled from '@emotion/styled';

const mp = facepaint([
  '@media(max-width: 1200px)',
  '@media(max-width: 992px)',
  '@media(max-width: 600px)',
]);

const Wrapper = styled.div({
  paddingTop: '75px',
});

const Layout = ({ children }) => (
  <Wrapper>
    {children}
  </Wrapper>
);

Layout.Main = styled.section(mp({
  margin: '0 auto',
  marginTop: '2rem',
  width: ['1024px', 'calc(100% - 2rem)', 'calc(100% - 1rem)'],
  position: 'relative',
  backgroundColor: '#fff',
}));

Layout.Title = styled.h3({
  fontSize: '32px',
  fontWeight: '600',
  letterSpacing: '-0.6px',
  color: '#212529',
  textAlign: 'center',
  padding: '40px 0',
});

Layout.TextLineDivider = styled.div({
  width: '70px',
  borderTop: '2px solid #FF8A3D',
  margin: '0 auto',
  marginBottom: '50px',
});

export default Layout;
