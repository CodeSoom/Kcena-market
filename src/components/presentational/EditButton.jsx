import React from 'react';

import Button from '@material-ui/core/Button';

const EditButton = ({ handleClickEdit }) => {
  const handleOnClick = async () => {
    handleClickEdit();
  };

  return (
    <Button
      size="small"
      variant="contained"
      color="primary"
      onClick={handleOnClick}
    >
      Edit
    </Button>
  );
};

export default EditButton;
