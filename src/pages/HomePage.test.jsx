import React from 'react';

import { MemoryRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { render, fireEvent } from '@testing-library/react';

import HomePage from './HomePage';

import products from '../../fixtures/products';

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
      const { getByText } = renderHomePage();

      fireEvent.click(getByText('크리넥스 KF-AD 소형 마스크 팝니다.'));

      expect(mockPush).toBeCalledWith('/products/1');
    });
  });
});
