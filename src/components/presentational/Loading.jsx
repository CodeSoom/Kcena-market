import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from '../../styles/styles';

export default function Loading({ isLoading }) {
  const classes = useStyles();

  return (
    <div>
      <Backdrop
        data-testid="backdrop"
        className={classes.backdrop}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
