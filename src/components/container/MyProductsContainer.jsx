import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { loadMyProducts } from '../../productSlice';

export default function MyProductsContainer({ user }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMyProducts({ user }));
  }, []);

  function handleDeleteProduct(productId) {
    dispatch(() => console.log(productId));
  }

  const myProducts = useSelector((state) => state.productReducer.myProducts) || [];

  return (
    <ul>
      {myProducts.map(({ id, title }) => (
        <li key={id}>
          {title}
          <button
            type="button"
            onClick={() => handleDeleteProduct(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
