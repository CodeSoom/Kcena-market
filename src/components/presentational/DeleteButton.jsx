import React, { useContext } from 'react';

import Button from '@material-ui/core/Button';

import ConfirmationContext from '../../contexts/ConfirmationContext';

const DeleteButton = ({ handleClickDelete }) => {
  const { showConfirmation, setConfirmForm } = useContext(ConfirmationContext);

  const handleOnClick = async () => {
    setConfirmForm({
      title: '삭제하시겠습니까?',
      content: '삭제하면 되돌릴 수 없습니다.',
    });

    const result = await showConfirmation();

    if (result) {
      handleClickDelete();
    }
  };

  return (
    <Button
      size="small"
      variant="contained"
      color="secondary"
      onClick={handleOnClick}
    >
      Delete
    </Button>
  );
};

export default DeleteButton;
