import React from 'react';

import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';

const EditButton = ({ productId }) => (
  <Button
    size="small"
    variant="contained"
    color="primary"
    component={Link}
    to={`/edit/${productId}`}
  >
    Edit
  </Button>
);

export default EditButton;
