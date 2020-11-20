import React from 'react';

import { Redirect } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { loadItem } from '../services/storage';

import useStyles from '../styles/styles';

export default function MyProfilePage() {
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
        내 정보
      </Typography>
    </Container>
  );
}
