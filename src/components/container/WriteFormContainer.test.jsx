import React from 'react';

import {
  fireEvent, render, waitFor, within,
} from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import WriteFormContainer from './WriteFormContainer';

jest.mock('react-redux');

describe('WriteFormContainer', () => {
  const dispatch = jest.fn();

  function renderWriteFormContainer() {
    return render(<WriteFormContainer />);
  }

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      commonReducer: {
        isLoading: given.isLoading,
      },
    }));
    window.URL.createObjectURL = jest.fn().mockImplementation(() => 'testImageUrl');
    window.URL.revokeObjectURL = jest.fn();
  });

  context('isLoading is true', () => {
    given('isLoading', () => true);
    it('render loading component', () => {
      const { getByTestId } = renderWriteFormContainer();

      const backdrop = getByTestId('backdrop');

      expect(backdrop).not.toHaveStyle('visibility : hidden');
    });
  });

  context('when all forms are filled', () => {
    given('isLoading', () => false);
    it('possible submit event', async () => {
      const { container, getAllByRole, getByRole } = renderWriteFormContainer();

      const title = container.querySelector('input[name="title"]');
      const description = container.querySelector('textarea[name="description"]');
      const category = getAllByRole('button')[0];
      const price = container.querySelector('input[name="price"]');
      const region = container.querySelector('input[name="region"]');

      await waitFor(() => {
        fireEvent.change(title, {
          target: {
            value: '아이패드',
          },
        });
      });

      fireEvent.mouseDown(category);
      const listbox = within(getByRole('listbox'));
      fireEvent.click(listbox.getByText(/디지털\/가전/i));

      await waitFor(() => {
        fireEvent.change(description, {
          target: {
            value: '중고 아이패드 팝니다.',
          },
        });
      });

      await waitFor(() => {
        fireEvent.change(price, {
          target: {
            value: '1234',
          },
        });
      });

      await waitFor(() => {
        fireEvent.change(region, {
          target: {
            value: '인천',
          },
        });
      });

      const submit = container.querySelector('button[type="submit"]');

      await waitFor(() => {
        fireEvent.click(submit);
      });

      expect(dispatch).toBeCalled();
    });
  });

  it('can upload a file with drag-and-drop or delete files with button', async () => {
    const { getByAltText, getByLabelText, getByTestId } = renderWriteFormContainer();

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
