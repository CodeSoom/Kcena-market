import React from 'react';

import { Redirect } from 'react-router-dom';

import { Container, Typography } from '@material-ui/core';
import { loadItem } from '../services/storage';

import WriteFormContainer from '../components/container/WriteFormContainer';

import useStyles from '../styles/styles';

export default function WritePage() {
  const classes = useStyles();

  const user = loadItem('user');
  if (user === null) {
    return <Redirect to="/login" />;
  }

  return (
    <Container
      component="section"
      maxWidth="md"
      className={classes.page}
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
