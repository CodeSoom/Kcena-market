import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import WriteForm from '../presentational/WriteForm';
import ImagesDropzone from '../presentational/ImagesDropzone';
import ImagePreview from '../presentational/ImagePreview';
import Loading from '../presentational/Loading';

import {
  postProduct,
} from '../../productSlice';

import { get } from '../../utils';

export default function WriteFormContainer() {
  const [files, setFiles] = useState([]);

  const dispatch = useDispatch();
  const { isLoading } = useSelector(get('commonReducer'));

  useEffect(() => () => {
    files.forEach((file) => URL.revokeObjectURL(file.imageUrl));
  }, [files]);

  function handleSubmit({ newProduct }) {
    dispatch(postProduct({ files, newProduct }));
  }

  async function handleOnDrop(acceptedFiles) {
    setFiles([
      ...files,
      ...acceptedFiles.map((file) => Object.assign(file, {
        imageUrl: URL.createObjectURL(file),
      })),
    ]);
  }

  function handleDeleteImage(imageUrl) {
    URL.revokeObjectURL(imageUrl);
    setFiles(
      files.filter((file) => file.imageUrl !== imageUrl),
    );
  }

  return (
    <div>
      <ImagesDropzone onDrop={handleOnDrop} />
      <ImagePreview
        productImages={files}
        handleClickDeleteImage={handleDeleteImage}
      />
      <WriteForm
        onSubmit={handleSubmit}
      />
      {isLoading && <Loading isLoading />}
    </div>
  );
}
