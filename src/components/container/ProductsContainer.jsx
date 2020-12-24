import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Products from '../presentational/Products';
import Loading from '../presentational/Loading';

import { get } from '../../utils';

import {
  loadInitProducts,
} from '../../productSlice';

export default function ProductsContainer({ onClickProduct }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadInitProducts());
  }, []);

  const { products } = useSelector(get('productReducer'));
  const { isLoading } = useSelector(get('commonReducer'));

  return isLoading ? (
    <Loading isLoading />
  ) : (
    <Products
      products={products}
      onClickProduct={onClickProduct}
    />
  );
}
