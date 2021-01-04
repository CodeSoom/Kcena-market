import React, { useContext } from 'react';

import Button from '@material-ui/core/Button';

import ConfirmationContext from '../../contexts/ConfirmationContext';

export default function LogoutForm({ handleClickLogout }) {
  const { showConfirmation, setConfirmForm } = useContext(ConfirmationContext);

  const handleOnClick = async () => {
    setConfirmForm({
      title: '로그아웃 하시겠습니까?',
      content: '',
    });

    const result = await showConfirmation();

    if (result) {
      handleClickLogout();
    }
  };

  return (
    <>
      <Button
        color="inherit"
        onClick={handleOnClick}
      >
        Log out
      </Button>
    </>
  );
}
