import React from 'react';

import { Redirect } from 'react-router-dom';

import {
  Typography, Container,
} from '@material-ui/core';
import { loadItem } from '../services/storage';

import useStyles from '../styles/styles';

import LoginFormContainer from '../components/container/LoginFormContainer';

export default function LoginPage() {
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
      <Typography component="h2" variant="h4">
        Log In
      </Typography>
      <LoginFormContainer />
    </Container>
  );
}
