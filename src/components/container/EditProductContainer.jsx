import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import WriteForm from '../presentational/WriteForm';
import ImagesDropzone from '../presentational/ImagesDropzone';
import ImagePreview from '../presentational/ImagePreview';
import Loading from '../presentational/Loading';

import {
  deleteProductImage,
  loadProduct,
  editPost,
  setInitialProduct,
} from '../../productSlice';

import { get } from '../../utils';

export default function EditProductContainer({ productId }) {
  const [files, setFiles] = useState([]);
  const [toBeDeletedUrls, setToBeDeletedUrls] = useState([]);

  const dispatch = useDispatch();

  const { product } = useSelector(get('productReducer'));
  const { isLoading } = useSelector(get('commonReducer'));

  useEffect(() => {
    dispatch(loadProduct({ productId }));
    return () => {
      dispatch(setInitialProduct());
    };
  }, []);

  useEffect(() => () => {
    files.forEach((file) => URL.revokeObjectURL(file.imageUrl));
  }, [files]);

  function handleSubmit({ newProduct }) {
    dispatch(editPost({
      files, toBeDeletedUrls, productId, newProduct,
    }));
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
    if (product.productImages
      .find((productImage) => (productImage.imageUrl === imageUrl))
    ) {
      setToBeDeletedUrls([
        ...toBeDeletedUrls,
        imageUrl,
      ]);
      dispatch(deleteProductImage(imageUrl));
      return;
    }
    URL.revokeObjectURL(imageUrl);
    setFiles(
      files.filter((file) => file.imageUrl !== imageUrl),
    );
  }

  return (
    <>
      <ImagesDropzone onDrop={handleOnDrop} />
      <ImagePreview
        productImages={[
          ...product.productImages,
          ...files,
        ]}
        handleClickDeleteImage={handleDeleteImage}
      />
      <WriteForm
        onSubmit={handleSubmit}
        initialEditProduct={product}
      />
      {isLoading && <Loading isLoading />}
    </>
  );
}
