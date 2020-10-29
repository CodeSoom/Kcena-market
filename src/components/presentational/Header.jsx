import React from 'react';
import { Link } from 'react-router-dom';

import {
  AppBar, Toolbar, Typography, Container,
} from '@material-ui/core';

import RightHeaderMenuContainer from '../container/RightHeaderMenuContainer';

import useStyles from '../../styles/styles';

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar color="primary" position="static">
        <Container maxWidth="lg">
          <Toolbar>
            <Typography
              color="inherit"
              component="h1"
              variant="h4"
            >
              <Link to="/">Kcena Market</Link>
            </Typography>
            <div className={classes.grow} />
            <RightHeaderMenuContainer />
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
