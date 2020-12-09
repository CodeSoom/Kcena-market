import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import WriteForm from '../presentational/WriteForm';
import ImagesDropzone from '../presentational/ImagesDropzone';
import ImagePreview from '../presentational/ImagePreview';

import {
  postProduct,
  addProductImages,
} from '../../productSlice';

import { uploadProductImages } from '../../services/api';

export default function WriteFormContainer() {
  const [files, setFiles] = useState([]);

  const dispatch = useDispatch();

  function handleSubmit({ newProduct }) {
    dispatch(postProduct({ files, newProduct }));
    setFiles([]);
  }

  async function handleOnDrop(files) {
    const productImages = await uploadProductImages({ files });
    dispatch(addProductImages(productImages));
  }

  function handleDeleteImage(selectedFile) {
    setFiles(files.filter((file) => file !== selectedFile));
  }

  function handleDeleteAll() {
    setFiles([]);
  }

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div>
      <ImagesDropzone onDrop={handleOnDrop} />
      <ImagePreview
        files={files}
        handleClickDeleteImage={handleDeleteImage}
        handleClickDeleteAllImage={handleDeleteAll}
      />
      <WriteForm
        onSubmit={handleSubmit}
      />
    </div>
  );
}
