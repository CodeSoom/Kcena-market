import React from 'react';

import styled from '@emotion/styled';

import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

import { isEmpty } from '../../utils';

export default function TableForm({
  columns, products, handleDeleteProduct,
}) {
  if (isEmpty(products || [])) {
    return (
      <EmptyUserProducts>
        품목이 없습니다!
      </EmptyUserProducts>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map(({ id, label }) => (
              <TableCell key={id}>
                {label}
              </TableCell>
            ))}
            <TableCell>삭제하기 / 수정하기</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              {columns.map(({ id, name }) => (
                <TableCell key={id}>
                  {product[name]}
                </TableCell>
              ))}
              <TableCell>
                <DeleteButton
                  handleClickDelete={() => handleDeleteProduct(product)}
                />
                <EditButton productId={product.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const EmptyUserProducts = styled.div({
  backgroundColor: '#fff',
  fontSize: '1.5rem',
  boxShadow: '0px 2px 2px 2px #999',
  width: '100%',
  height: '200px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
