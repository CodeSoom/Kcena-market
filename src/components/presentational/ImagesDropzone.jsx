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
              상품 이미지를 드래그해서 올려주세요! 또는 클릭해서 파일을 선택해주세요!
            </Typography>
          </div>
        </section>
      )}
    </Dropzone>
  );
}
