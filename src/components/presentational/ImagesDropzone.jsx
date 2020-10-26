/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Dropzone from 'react-dropzone';

import { Typography } from '@material-ui/core';
import useStyles from '../../styles/styles';

export default function ImagesDropzone({
  onDrop,
}) {
  const classes = useStyles();

  return (
    <Dropzone onDrop={onDrop}>
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Typography
              className={classes.dropzoneArea}
              color="primary"
              align="center"
            >
              Drag and drop some files here, or click to select files
            </Typography>
          </div>
        </section>
      )}
    </Dropzone>
  );
}
