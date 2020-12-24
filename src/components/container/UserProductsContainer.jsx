import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import LinearProgress from '@material-ui/core/LinearProgress';
import {
  loadUserProducts,
  deleteProduct,
} from '../../productSlice';

import TableForm from '../presentational/TableForm';

const columns = [
  { id: 1, name: 'title', label: '상품 이름' },
  { id: 2, name: 'category', label: '카테고리' },
  { id: 3, name: 'price', label: '가격' },
];

export default function UserProductsContainer({ user }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserProducts({ user }));
  }, []);

  function handleDeleteProduct(product) {
    dispatch(deleteProduct({ product }));
  }

  const isLoading = useSelector((state) => state.commonReducer.isLoading);
  const userProducts = useSelector((state) => state.productReducer.userProducts);

  return isLoading ? (
    <LinearProgress data-testid="LinerProgress" />
  ) : (
    <TableForm
      columns={columns}
      products={userProducts}
      handleDeleteProduct={handleDeleteProduct}
    />
  );
}
