import React from 'react';

import styled from '@emotion/styled';

const Error = styled.div({
  color: 'red',
});

export default function TextError({ children }) {
  return (
    <Error>
      {children}
    </Error>
  );
}
