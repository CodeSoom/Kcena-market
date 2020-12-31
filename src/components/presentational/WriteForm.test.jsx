import React from 'react';

import {
  render, fireEvent, waitFor, within,
} from '@testing-library/react';

import WriteForm from './WriteForm';

describe('WriteForm', () => {
  const handleSubmit = jest.fn();

  const controls = [
    { control: 'input', name: 'title', text: '아이패드' },
    { control: 'input', name: 'category', text: '디지털/가전' },
    { control: 'input', name: 'region', text: '인천' },
    { control: 'input', name: 'price', text: '200000' },
    { control: 'textarea', name: 'description', text: '중고 팝니다.' },
  ];

  function renderWriteForm({ initialEditProduct } = {}) {
    return render((
      <WriteForm
        onSubmit={handleSubmit}
        initialEditProduct={initialEditProduct}
      />
    ));
  }

  beforeEach(() => {
    handleSubmit.mockClear();
  });

  it('render input form controls', () => {
    const { container } = renderWriteForm();

    controls.forEach(({ control, name }) => {
      const input = container.querySelector(`${control}[name=${name}]`);

      expect(input).not.toBeNull();
    });
  });

  context('when all forms are filled', () => {
    it('possible submit event', async () => {
      const {
        container, getAllByRole, getByRole,
      } = renderWriteForm();

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

      expect(handleSubmit).toHaveBeenCalledWith({
        product: {
          title: '아이패드',
          category: '디지털/가전',
          description: '중고 아이패드 팝니다.',
          price: 1234,
          region: '인천',
        },
      });
    });
  });

  context('When all forms are not filled', () => {
    it('can\'t submit and show validation', async () => {
      const { container } = renderWriteForm();

      const submit = container.querySelector('button[type="submit"]');

      await waitFor(() => {
        fireEvent.click(submit);
      });

      await waitFor(() => {
        expect(container).toHaveTextContent(/필수 항목입니다./);
      });
    });
  });
});
