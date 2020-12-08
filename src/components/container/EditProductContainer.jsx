import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import WriteForm from '../presentational/WriteForm';

import {
  loadProduct,
  setProduct,
} from '../../productSlice';

import { get } from '../../utils';

export default function EditProductContainer({ productId }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProduct({ productId }));
    return () => {
      dispatch(setProduct(null));
    };
  }, []);

  const { product } = useSelector(get('productReducer'));

  if (!product) {
    return (
      <p>loading...</p>
    );
  }

  return (
    <>
      <WriteForm
        onSubmit={() => {}}
        initialEditProduct={product}
      />
    </>
  );
}
