import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Products from '../presentational/Products';

import { get } from '../../utils';

import {
  loadInitProducts,
} from '../../actions';

export default function ProductsContainer({ onClickProduct }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadInitProducts());
  }, []);

  const products = useSelector(get('products'));

  return (
    <Products
      products={products}
      onClickProduct={onClickProduct}
    />
  );
}
