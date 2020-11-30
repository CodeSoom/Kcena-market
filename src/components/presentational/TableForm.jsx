import React from 'react';

import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import DeleteButton from './DeleteButton';

import { isEmpty } from '../../utils';

export default function TableForm(
  { columns, products, handleDeleteProduct },
) {
  if (isEmpty(products || [])) {
    return (
      <div>품목이 없습니다!</div>
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
            <TableCell>
              수정하기 / 삭제하기
            </TableCell>
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
                  onClickDelete={() => handleDeleteProduct(product)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
