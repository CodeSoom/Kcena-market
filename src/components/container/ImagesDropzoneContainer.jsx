import React, { useState, useEffect } from 'react';
import ImagesDropzone from '../presentational/ImagesDropzone';
import ImagePreview from '../presentational/ImagePreview';

export default function ImagesDropzoneContainer() {
  const [files, setFiles] = useState([]);

  function handleOnDrop(acceptedFiles) {
    setFiles([
      ...files,
      ...acceptedFiles.map((file) => Object.assign(file, {
        preview: URL.createObjectURL(file),
      })),
    ]);
  }

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div>
      <ImagesDropzone onDrop={handleOnDrop} />
      <ImagePreview files={files} />
    </div>
  );
}
