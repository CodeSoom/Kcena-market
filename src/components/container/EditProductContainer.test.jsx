import React from 'react';

import {
  waitFor, fireEvent, render,
} from '@testing-library/react';
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
      commonReducer: {
        isLoading: given.isLoading,
      },
    }));
  });

  function renderEditProductContainer() {
    return render((
      <EditProductContainer productId="1" />
    ));
  }

  context('isLoading is true', () => {
    given('isLoading', () => true);
    given('product', () => products[0]);
    it('render loading component', () => {
      const { getByTestId } = renderEditProductContainer();

      const backdrop = getByTestId('backdrop');

      expect(backdrop).not.toHaveStyle('visibility : hidden');
    });
  });

  context('with initial edit product', () => {
    given('product', () => products[0]);
    given('isLoading', () => false);

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

    it('listen click 수정하기 button and call dispatch', () => {
      const { getByText } = renderEditProductContainer();

      const button = getByText('수정하기');

      fireEvent.click(button);

      expect(dispatch).toBeCalled();
    });

    it('listen click delete button and call dispatch', () => {
      const { getAllByLabelText } = renderEditProductContainer();

      const deleteButtons = getAllByLabelText('delete');

      deleteButtons.forEach((deleteButton) => {
        fireEvent.click(deleteButton);

        expect(dispatch).toBeCalled();
      });
    });
  });

  context('without productImages', () => {
    given('product', () => ({
      title: '',
      description: '',
      category: '',
      region: '',
      price: '',
      productImages: [],
      user: {},
      createAt: '',
    }));

    beforeEach(() => {
      window.URL.createObjectURL = jest.fn().mockImplementation(() => 'testImageUrl');
      window.URL.revokeObjectURL = jest.fn();
    });

    it('can upload a file with drag-and-drop or delete files with button', async () => {
      const { getByAltText, getByLabelText, getByTestId } = renderEditProductContainer();

      const inputElement = getByTestId('drop-input');

      const file = new File(['file'], 'testImage.png', {
        type: 'application/json',
      });

      Object.defineProperty(inputElement, 'files', {
        value: [file],
      });

      fireEvent.drop(inputElement);

      const image = await waitFor(() => getByAltText('testImage.png'));

      expect(image).toHaveAttribute('src', 'testImageUrl');

      const deleteButton = getByLabelText('delete');

      fireEvent.click(deleteButton);
    });
  });
});
