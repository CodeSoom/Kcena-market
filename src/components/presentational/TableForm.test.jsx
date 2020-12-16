import React from 'react';

import { fireEvent, render, waitFor } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import TableForm from './TableForm';

import ConfirmationContext from '../../contexts/ConfirmationContext';

import userProducts from '../../../fixtures/userProducts';

describe('TableForm', () => {
  const handleDeleteProduct = jest.fn();
  const showConfirmation = jest.fn();
  const setConfirmForm = jest.fn();

  const columns = [
    { id: 1, name: 'title', label: '상품 이름' },
    { id: 2, name: 'category', label: '카테고리' },
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
        <MemoryRouter>
          <TableForm
            columns={columns}
            products={products}
            handleDeleteProduct={handleDeleteProduct}
          />
        </MemoryRouter>
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
      handleDeleteProduct.mockClear();
      setConfirmForm.mockClear();
      showConfirmation.mockResolvedValue(() => true);
    });

    it('render current user selling products', () => {
      const { getByText } = renderTableForm({ products: userProducts });

      userProducts.forEach(({ title }) => {
        expect(getByText(title)).not.toBeNull();
      });
    });

    it('render delete buttons', async () => {
      const { getAllByText } = renderTableForm({ products: userProducts });

      const button = getAllByText('Delete')[0];

      fireEvent.click(button);

      await waitFor(() => expect(handleDeleteProduct).toBeCalled());
    });
  });
});
