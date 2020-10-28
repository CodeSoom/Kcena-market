import React from 'react';

import {
  TextField, Button, InputAdornment, Box,
} from '@material-ui/core';
import {
  AccountCircle, LockRounded,
} from '@material-ui/icons';

import useStyles from '../../styles/styles';

export default function SignupForm({
  fields, onChange, onSubmit, error,
}) {
  const { email, password } = fields;
  const classes = useStyles();

  function handleChange(event) {
    const { target: { name, value } } = event;
    onChange({ name, value });
  }

  return (
    <div className={classes.form}>
      <div>
        <p>{error}</p>
      </div>
      <TextField
        type="email"
        label="E-mail"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="signup-email"
        name="email"
        value={email}
        onChange={handleChange}
        autoFocus
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        type="password"
        label="Password"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="signup-password"
        name="password"
        value={password}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockRounded />
            </InputAdornment>
          ),
        }}
      />
      <Box clone my={1}>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          onClick={onSubmit}
        >
          Sign up
        </Button>
      </Box>
    </div>
  );
}
