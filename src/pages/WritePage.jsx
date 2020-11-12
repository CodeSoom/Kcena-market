import React from 'react';

import { Redirect } from 'react-router-dom';

import { Container, Typography } from '@material-ui/core';
import { loadItem } from '../services/storage';

import WriteFormContainer from '../components/container/WriteFormContainer';

export default function WritePage() {
  const user = loadItem('user');
  if (user === null) {
    return <Redirect to="/login" />;
  }

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
