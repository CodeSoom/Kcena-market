import React from 'react';

import { render } from '@testing-library/react';

import { useSelector } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';

import WritePage from './WritePage';

jest.mock('react-redux');

describe('WritePage', () => {
  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      productReducer: {
        newProduct: {
          title: '',
          description: '',
        },
      },
    }));
  });

  it('render', () => {
    const { container } = render((
      <MemoryRouter>
        <WritePage />
      </MemoryRouter>
    ));

    expect(container).toHaveTextContent('Write new product');
  });
});
