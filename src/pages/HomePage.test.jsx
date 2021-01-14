import React from 'react';

import { MemoryRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { render, fireEvent } from '@testing-library/react';

import HomePage from './HomePage';

import products from '../../fixtures/products';
import product from '../../fixtures/product';

const mockPush = jest.fn();

jest.mock('react-redux');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { push: mockPush };
  },
}));

describe('HomePage', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      productReducer: {
        products,
      },
      commonReducer: {
        isLoading: false,
      },
    }));
  });

  function renderHomePage() {
    return render((
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    ));
  }

  it('renders products', () => {
    const { container } = renderHomePage();

    products.forEach(({ title, region, price }) => {
      expect(container).toHaveTextContent(title);
      expect(container).toHaveTextContent(region);
      expect(container).toHaveTextContent(price);
    });
  });

  context('when click product', () => {
    it('occur handle event', () => {
      const { title } = product;

      const { getByText } = renderHomePage();

      fireEvent.click(getByText(title));

      expect(mockPush).toBeCalledWith('/products/1');
    });
  });
});
