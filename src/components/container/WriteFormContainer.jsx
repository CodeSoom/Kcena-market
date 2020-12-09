import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import WriteForm from '../presentational/WriteForm';
import ImagesDropzone from '../presentational/ImagesDropzone';
import ImagePreview from '../presentational/ImagePreview';

import {
  postProduct,
  addProductImages,
  deleteImage,
} from '../../productSlice';

import { uploadProductImages } from '../../services/api';

export default function WriteFormContainer() {
  const dispatch = useDispatch();

  const { productImages } = useSelector((state) => state.productReducer.product);

  function handleSubmit({ newProduct }) {
    dispatch(postProduct({ newProduct }));
  }

  async function handleOnDrop(files) {
    const urls = await uploadProductImages({ files });
    const productImages = files.map((file, index) => ({
      name: file.name,
      imageUrl: urls[index],
    }));
    dispatch(addProductImages(productImages));
  }

  function handleDeleteImage(imageUrl) {
    dispatch(deleteImage({ imageUrl }));
  }

  return (
    <div>
      <ImagesDropzone onDrop={handleOnDrop} />
      <ImagePreview
        productImages={productImages}
        handleClickDeleteImage={handleDeleteImage}
      />
      <WriteForm
        onSubmit={handleSubmit}
      />
    </div>
  );
}
