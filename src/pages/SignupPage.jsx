import React from 'react';

import { Typography, Container } from '@material-ui/core';

import SignupFormContainer from '../components/container/SignupFormContainer';
import useStyles from '../styles/styles';

export default function SignupPage() {
  const classes = useStyles();
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
