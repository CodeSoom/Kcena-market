import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ConfirmDialog({
  confirmDialog, setConfirmDialog,
}) {
  const {
    isOpen, title, content, onConfirm,
  } = confirmDialog;

  function onClose() {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={onClose}
          color="default"
        >
          NO
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            onConfirm();
            onClose();
          }}
          color="secondary"
        >
          YES
        </Button>
      </DialogActions>
    </Dialog>
  );
}
