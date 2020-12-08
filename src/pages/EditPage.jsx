import React from 'react';

import { useParams, Redirect } from 'react-router-dom';

import { Container, Typography } from '@material-ui/core';
import { loadItem } from '../services/storage';

import useStyles from '../styles/styles';

export default function EditPage({ params }) {
  const classes = useStyles();

  const { id } = params || useParams();

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
        Edit product
      </Typography>
      {id}
    </Container>
  );
}
