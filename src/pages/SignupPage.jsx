import React from 'react';

import { Redirect } from 'react-router-dom';

import { Typography, Container } from '@material-ui/core';

import { loadItem } from '../services/storage';

import SignupFormContainer from '../components/container/SignupFormContainer';
import useStyles from '../styles/styles';

export default function SignupPage() {
  const classes = useStyles();

  const user = loadItem('user');
  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <Container
      component="section"
      maxWidth="xs"
      className={classes.paper}
    >
      <Typography
        component="h2"
        variant="h4"
      >
        Sign up
      </Typography>
      <SignupFormContainer />
    </Container>
  );
}
