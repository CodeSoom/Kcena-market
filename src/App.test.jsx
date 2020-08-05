import React from 'react';

import { render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import App from './App';

import products from '../fixtures/products';

jest.mock('react-redux');

describe('App', () => {
  const dispatch = jest.fn();
  beforeEach(() => {
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      products,
    }));
  });

  it('renders Title', () => {
    const { container } = render((
      <MemoryRouter>
        <App />
      </MemoryRouter>
    ));

    expect(container).toHaveTextContent('Kcena Market');
  });

  context('with invalid path', () => {
    it('renders the not found page', () => {
      const { container } = render((
        <MemoryRouter initialEntries={['/invalid']}>
          <App />
        </MemoryRouter>
      ));

      expect(container).toHaveTextContent('Not Found');
    });
  });
});
