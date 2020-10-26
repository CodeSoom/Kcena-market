import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import WriteFormContainer from './WriteFormContainer';

import newProduct from '../../../fixtures/newProduct';

jest.mock('react-redux');

describe('WriteFormContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      productReducer: {
        newProduct,
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

    expect(getByLabelText(/글 제목/).value).toBe(newProduct.title);
    expect(getByLabelText(/게시글 내용을 작성해주세요/).value).toBe(newProduct.description);
  });

  it('listens change events', () => {
    const { getByLabelText } = renderWriteFormContainer();

    expect(getByLabelText(/글 제목/).value).toBe(newProduct.title);

    fireEvent.change(getByLabelText(/글 제목/), {
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
