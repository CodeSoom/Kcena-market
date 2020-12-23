import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Products from '../presentational/Products';

import { get } from '../../utils';

import {
  loadInitProducts,
} from '../../productSlice';

export default function ProductsContainer({ onClickProduct }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadInitProducts());
  }, []);

  const { products, isLoading } = useSelector(get('productReducer'));

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <Products
      products={products}
      onClickProduct={onClickProduct}
    />
  );
}
