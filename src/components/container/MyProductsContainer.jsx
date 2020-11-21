import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { loadMyProducts } from '../../productSlice';

import TableForm from '../presentational/TableForm';

export default function MyProductsContainer({ user }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMyProducts({ user }));
  }, []);

  function handleDeleteProduct(productId) {
    dispatch(() => console.log(productId));
  }

  const myProducts = useSelector((state) => state.productReducer.myProducts);

  return (
    <TableForm
      products={myProducts}
      handleDeleteProduct={handleDeleteProduct}
    />
  );
}
