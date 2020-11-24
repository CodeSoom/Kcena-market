import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ConfirmDialog({
  isOpen, title, content, onConfirm, onCancel,
}) {
  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={onCancel}
          color="default"
        >
          NO
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          color="secondary"
        >
          YES
        </Button>
      </DialogActions>
    </Dialog>
  );
}
