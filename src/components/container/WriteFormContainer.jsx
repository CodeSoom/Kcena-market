import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';

import WriteForm from '../presentational/WriteForm';
import ImagesDropzone from '../presentational/ImagesDropzone';
import ImagePreview from '../presentational/ImagePreview';

import {
  writeNewProduct,
  postProduct,
} from '../../productSlice';

export default function WriteFormContainer() {
  const [files, setFiles] = useState([]);

  const dispatch = useDispatch();

  const newProduct = useSelector((state) => state.productReducer.newProduct);

  function handleChange({ name, value }) {
    dispatch(writeNewProduct({ name, value }));
  }

  function handleSubmit() {
    dispatch(postProduct({ files }));
    setFiles([]);
  }

  function handleOnDrop(acceptedFiles) {
    setFiles([
      ...files,
      ...acceptedFiles.map((file) => Object.assign(file, {
        preview: URL.createObjectURL(file),
        id: uuidv4(),
      })),
    ]);
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
        newProduct={newProduct}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
