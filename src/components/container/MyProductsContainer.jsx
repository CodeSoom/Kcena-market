import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { loadMyProducts } from '../../productSlice';

export default function MyProductsContainer({ user }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMyProducts({ user }));
  }, []);

  const myProducts = useSelector((state) => state.productReducer.myProducts) || [];

  return (
    <ul>
      {myProducts.map(({ id, title }) => (
        <li key={id}>{title}</li>
      ))}
    </ul>
  );
}
