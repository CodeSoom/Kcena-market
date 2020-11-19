import React from 'react';

import { Redirect } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { loadItem } from '../services/storage';

import LoginFormContainer from '../components/container/LoginFormContainer';

import useStyles from '../styles/styles';

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
      className={classes.page}
    >
      <Typography
        component="h2"
        variant="h4"
        align="center"
      >
        Log In
      </Typography>
      <LoginFormContainer />
    </Container>
  );
}
