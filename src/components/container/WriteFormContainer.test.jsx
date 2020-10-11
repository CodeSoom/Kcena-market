import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import WriteFormContainer from './WriteFormContainer';

jest.mock('react-redux');

describe('WriteFormContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      productReducer: {
        newProduct: {
          title: 'new product',
          description: 'this product is ...',
        },
      },
    }));
  });

  function renderWriteFormContainer() {
    return render(
      <WriteFormContainer />,
    );
  }

  it('renders input controls', () => {
    const { getByLabelText } = renderWriteFormContainer();

    expect(getByLabelText('Title').value).toBe('new product');
    expect(getByLabelText('Description').value).toBe('this product is ...');
  });

  it('listens change events', () => {
    const { getByLabelText } = renderWriteFormContainer();

    expect(getByLabelText('Title').value).toBe('new product');

    fireEvent.change(getByLabelText('Title'), {
      target: { value: '핸드폰 팝니다.' },
    });

    expect(dispatch).toBeCalledWith({
      type: 'productSlice/writeNewProduct',
      payload: { name: 'title', value: '핸드폰 팝니다.' },
    });
  });

  it('listens submit event', () => {
    const { getByText } = renderWriteFormContainer();

    fireEvent.click(getByText('글쓰기'));

    expect(dispatch).toBeCalled();
  });
});
