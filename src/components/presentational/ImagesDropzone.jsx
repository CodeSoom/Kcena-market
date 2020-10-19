/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Dropzone from 'react-dropzone';

export default function ImagesDropzone({
  onDrop,
}) {
  return (
    <Dropzone onDrop={onDrop}>
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag and drop some files here, or click to select files</p>
          </div>
        </section>
      )}
    </Dropzone>
  );
}
