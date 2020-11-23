import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  loadLoggedInUserSellProducts,
  deleteProduct,
} from '../../productSlice';
import ConfirmDialog from '../presentational/ConfirmDialog';

import TableForm from '../presentational/TableForm';

const columns = [
  { id: 1, name: 'title', label: '상품 이름' },
  { id: 2, name: 'price', label: '가격' },
];

export default function LoggedInUserSellProductsContainer({ user }) {
  const dispatch = useDispatch();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    content: '',
  });

  useEffect(() => {
    dispatch(loadLoggedInUserSellProducts({ user }));
  }, []);

  function handleDeleteProduct(product) {
    setConfirmDialog({
      isOpen: true,
      title: '상품을 삭제하시겠습니까?',
      content: '삭제하면 되돌릴 수 없습니다.',
      onConfirm: () => dispatch(deleteProduct({ product })),
    });
  }

  const userProducts = useSelector((state) => state.productReducer.loggedInUserSellProducts);

  return (
    <>
      <TableForm
        columns={columns}
        products={userProducts}
        handleDeleteProduct={handleDeleteProduct}
      />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
