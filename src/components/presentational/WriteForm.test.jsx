import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import WriteForm from './WriteForm';

describe('WriteForm', () => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();

  beforeEach(() => {
    handleChange.mockClear();
    handleSubmit.mockClear();
  });

  function renderWriteForm({
    title, description, price, region,
  } = {}) {
    return render((
      <WriteForm
        newProduct={{
          title, description, price, region,
        }}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    ));
  }

  it('render input controls', () => {
    const title = 'new product';
    const description = 'test description';
    const price = '10000';
    const region = '인천';

    const { getByLabelText } = renderWriteForm({
      title, description, price, region,
    });

    const controls = [
      { label: /글 제목/, value: title },
      { label: /게시글 내용을 작성해주세요/, value: description },
      { label: /상품 가격/, value: price },
      { label: /판매 지역/, value: region },
    ];

    controls.forEach(({ label, value }) => {
      const input = getByLabelText(label);
      expect(input.value).toBe(value);
    });
  });

  it('listens change events', () => {
    const { getByLabelText } = renderWriteForm();

    const controls = [
      {
        label: /글 제목/,
        name: 'title',
        value: '아이패드 팝니다.',
      },
      {
        label: /게시글 내용을 작성해주세요/,
        name: 'description',
        value: '상태 좋아요',
      },
      {
        label: /상품 가격/,
        name: 'price',
        value: '10000',
      },
      {
        label: /판매 지역/,
        name: 'region',
        value: '인천',
      },
    ];

    controls.forEach(({ label, name, value }) => {
      const input = getByLabelText(label);

      fireEvent.change(input, { target: { value } });

      expect(handleChange).toBeCalledWith({ name, value });
    });
  });

  it('listens submit event', () => {
    const { getByText } = renderWriteForm();

    fireEvent.click(getByText('글쓰기'));

    expect(handleSubmit).toBeCalled();
  });
});
