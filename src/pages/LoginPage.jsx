import React from 'react';

import {
  Typography, Container,
} from '@material-ui/core';

import useStyles from '../styles/styles';

import LoginFormContainer from '../components/container/LoginFormContainer';

export default function LoginPage() {
  const classes = useStyles();

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
