import React from 'react';

import { fireEvent, render, waitFor } from '@testing-library/react';

import TableForm from './TableForm';

import ConfirmationContext from '../../contexts/ConfirmationContext';

import loggedInUserSellProducts from '../../../fixtures/loggedInUserSellProducts';

describe('TableForm', () => {
  const handleDeleteProducts = jest.fn();
  const showConfirmation = jest.fn();
  const setConfirmForm = jest.fn();

  const columns = [
    { id: 1, name: 'title', label: '상품 이름' },
    { id: 2, name: 'categories', label: '카테고리' },
    { id: 3, name: 'price', label: '가격' },
  ];

  function renderTableForm({ products }) {
    return render((
      <ConfirmationContext.Provider
        value={{
          showConfirmation,
          setConfirmForm,
        }}
      >
        <TableForm
          columns={columns}
          products={products}
          handleDeleteProduct={handleDeleteProducts}
        />
      </ConfirmationContext.Provider>
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
    beforeEach(() => {
      handleDeleteProducts.mockClear();
      setConfirmForm.mockClear();
      showConfirmation.mockResolvedValue(() => true);
    });

    it('render current user selling products', () => {
      const { getByText } = renderTableForm({ products: loggedInUserSellProducts });

      loggedInUserSellProducts.forEach(({ title }) => {
        expect(getByText(title)).not.toBeNull();
      });
    });

    it('render delete buttons', () => {
      const { getAllByText } = renderTableForm({ products: loggedInUserSellProducts });

      const buttons = getAllByText('Delete');

      buttons.forEach(async (button) => {
        fireEvent.click(button);
        await waitFor(() => expect(handleDeleteProducts).toBeCalled());
      });
    });
  });
});
