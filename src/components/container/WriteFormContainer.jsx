import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import WriteForm from '../presentational/WriteForm';

import {
  writeNewProduct,
  postProduct,
} from '../../productSlice';

export default function WriteFormContainer() {
  const dispatch = useDispatch();

  const newProduct = useSelector((state) => state.productReducer.newProduct);

  function handleChange({ name, value }) {
    dispatch(writeNewProduct({ name, value }));
  }

  function handleSubmit() {
    dispatch(postProduct());
  }

  return (
    <WriteForm
      newProduct={newProduct}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
