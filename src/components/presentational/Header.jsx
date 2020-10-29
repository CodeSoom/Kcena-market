import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import {
  AppBar, Toolbar, Button, Typography, Container,
} from '@material-ui/core';

import useStyles from '../../styles/styles';

export default function Header() {
  const user = useSelector((state) => state.authReducer.user);
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar color="primary" position="static">
        <Container maxWidth="lg">
          <Toolbar>
            <Typography
              className={classes.title}
              color="inherit"
              component="h1"
              variant="h4"
            >
              <Link to="/">Kcena Market</Link>
            </Typography>
            <div className={classes.grow} />
            {user.uid
            && (
              <Button color="inherit">
                <Link to="/newproduct">판매하기</Link>
              </Button>
            )}
            <Button color="inherit">
              <Link to="/login">Log In</Link>
            </Button>
            <Button color="inherit">
              <Link to="/signup">Sign up</Link>
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
