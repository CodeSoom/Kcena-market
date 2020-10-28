import React from 'react';

import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from '../../styles/styles';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  margin: '16px 0',
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
};

const thumbInner = {
  display: 'flex',
  position: 'relative',
  minWidth: 0,
  flexFlow: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

export default function ImagePreview({
  files, handleClickDeleteImage,
}) {
  const classes = useStyles();
  if (files.length === 0) {
    return null;
  }

  return (
    <aside style={thumbsContainer}>
      {files.map((file) => (
        <div style={thumb} key={file.id}>
          <div style={thumbInner}>
            <img
              alt={file.name}
              src={file.preview}
              style={img}
            />
            <IconButton
              aria-label="delete"
              className={classes.deleteButton}
              onClick={() => handleClickDeleteImage(file)}
              variant="contained"
              color="secondary"
            >
              <DeleteIcon
                fontSize="small"
              />
            </IconButton>

          </div>
        </div>
      ))}
    </aside>
  );
}
