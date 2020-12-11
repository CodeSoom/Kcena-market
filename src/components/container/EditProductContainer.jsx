import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import WriteForm from '../presentational/WriteForm';
import ImagesDropzone from '../presentational/ImagesDropzone';
import ImagePreview from '../presentational/ImagePreview';

import {
  loadProduct,
} from '../../productSlice';

import { get } from '../../utils';

export default function EditProductContainer({ productId }) {
  const [files, setFiles] = useState([]);

  const dispatch = useDispatch();

  const { product } = useSelector(get('productReducer'));

  useEffect(() => {
    dispatch(loadProduct({ productId }));
  }, []);

  useEffect(() => () => {
    files.forEach((file) => URL.revokeObjectURL(file.imageUrl));
  }, [files]);

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

  if (!product) {
    return (
      <p>loading...</p>
    );
  }

  return (
    <div>
      <ImagesDropzone onDrop={handleOnDrop} />
      <ImagePreview
        productImages={[
          ...product.productImages,
          ...files,
        ]}
        handleClickDeleteImage={handleDeleteImage}
      />
      <WriteForm
        onSubmit={() => {}}
        initialEditProduct={product}
      />
    </div>
  );
}
