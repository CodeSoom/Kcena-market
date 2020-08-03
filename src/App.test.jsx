import React from 'react';

import { render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';

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
    const { container } = render(<App />);

    expect(container).toHaveTextContent('Kcena Market');
  });
});
