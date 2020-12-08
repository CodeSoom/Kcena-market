import React from 'react';

import { render } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';

import EditProductContainer from './EditProductContainer';

import products from '../../../fixtures/products';

jest.mock('react-redux');

describe('EditProductContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      productReducer: {
        product: given.product,
      },
    }));
  });

  function renderEditProductContainer() {
    return render((
      <EditProductContainer productId="1" />
    ));
  }

  context('with initial edit product', () => {
    given('product', () => products[0]);

    it('dispatchs called', () => {
      renderEditProductContainer();

      expect(dispatch).toBeCalled();
    });

    it('renders product', () => {
      const { getByDisplayValue, getByText } = renderEditProductContainer();

      const {
        title, category, region,
      } = products[0];

      const button = getByText('수정하기');

      expect(button).toBeInTheDocument();
      expect(getByDisplayValue(title)).toBeInTheDocument();
      expect(getByDisplayValue(category)).toBeInTheDocument();
      expect(getByDisplayValue(region)).toBeInTheDocument();
    });
  });

  context('without product', () => {
    given('empty product', () => {});
    it('renders loading message', () => {
      const { container } = renderEditProductContainer();

      expect(container).toHaveTextContent('loading...');
    });
  });
});
