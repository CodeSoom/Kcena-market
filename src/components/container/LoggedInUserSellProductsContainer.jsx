import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  loadMyProducts,
  deleteProduct,
} from '../../productSlice';

import TableForm from '../presentational/TableForm';

const columns = [
  { id: 1, name: 'title', label: '상품 이름' },
  { id: 2, name: 'price', label: '가격' },
];

export default function LoggedInUserSellProductsContainer({ user }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMyProducts({ user }));
  }, []);

  function handleDeleteProduct(product) {
    dispatch(deleteProduct({ product }));
  }

  const myProducts = useSelector((state) => state.productReducer.myProducts);

  return (
    <TableForm
      columns={columns}
      products={myProducts}
      handleDeleteProduct={handleDeleteProduct}
    />
  );
}
