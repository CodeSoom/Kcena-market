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
      { label: 'Title', value: title },
      { label: 'Description', value: description },
      { label: 'Price', value: price },
      { label: 'Region', value: region },
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
        label: 'Title',
        name: 'title',
        value: '아이패드 팝니다.',
      },
      {
        label: 'Description',
        name: 'description',
        value: '상태 좋아요',
      },
      {
        label: 'Price',
        name: 'price',
        value: '10000',
      },
      {
        label: 'Region',
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
