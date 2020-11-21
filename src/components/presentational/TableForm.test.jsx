import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import TableForm from './TableForm';

import myProducts from '../../../fixtures/myProducts';

describe('TableForm', () => {
  const handleDeleteProducts = jest.fn();
  const columns = [
    { id: 1, name: 'title', label: '상품 이름' },
    { id: 2, name: 'price', label: '가격' },
  ];

  function renderTableForm({ products }) {
    return render((
      <TableForm
        columns={columns}
        products={products}
        handleDeleteProduct={handleDeleteProducts}
      />
    ));
  }

  context('without products', () => {
    it('renders no products message', () => {
      [[], undefined, null].forEach((emptyProducts) => {
        const { container } = renderTableForm({ products: emptyProducts });

        expect(container).toHaveTextContent('품목이 없습니다!');
      });
    });
  });

  context('with products', () => {
    it('render current user selling products', () => {
      const { getByText } = renderTableForm({ products: myProducts });

      myProducts.forEach(({ title }) => {
        expect(getByText(title)).not.toBeNull();
      });
    });

    it('listens click event for delete product', () => {
      const { getAllByText } = renderTableForm({ products: myProducts });

      const buttons = getAllByText('Delete');

      buttons.forEach((button) => {
        fireEvent.click(button);
        expect(handleDeleteProducts).toBeCalled();
      });
    });
  });
});
