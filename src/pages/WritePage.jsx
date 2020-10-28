import React from 'react';

import { Container, Typography } from '@material-ui/core';
import WriteFormContainer from '../components/container/WriteFormContainer';

export default function WritePage() {
  return (
    <Container
      component="section"
      maxWidth="md"
    >
      <Typography
        component="h2"
        variant="h4"
        align="center"
      >
        Write new product
      </Typography>
      <WriteFormContainer />
    </Container>
  );
}
