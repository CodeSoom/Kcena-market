import React from 'react';

import { render } from '@testing-library/react';

import { useSelector } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';

import WritePage from './WritePage';

import newProduct from '../../fixtures/newProduct';

jest.mock('react-redux');

describe('WritePage', () => {
  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      productReducer: {
        newProduct,
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
