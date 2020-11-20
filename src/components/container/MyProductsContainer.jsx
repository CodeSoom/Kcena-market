import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { loadMyProducts } from '../../productSlice';

export default function MyProductsContainer({ user }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMyProducts({ user }));
  }, []);

  const myProducts = useSelector((state) => state.productReducer.myProducts);

  return (
    <div>
      {/* TODO : 판매 상품을 보여주는 Form 작성 */}
    </div>
  );
}
