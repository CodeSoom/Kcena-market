import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ProductDetail from '../presentational/ProductDetail';

import {
  loadProduct, setInitialProduct,
} from '../../productSlice';

import { get } from '../../utils';

export default function ProductContainer({ productId }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProduct({ productId }));
    return () => {
      dispatch(setInitialProduct());
    };
  }, []);

  const { product } = useSelector(get('productReducer'));

  return (
    <ProductDetail product={product} />
  );
}
