import React from 'react';

import { render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';

import App from './App';

import items from '../fixtures/items';

jest.mock('react-redux');

describe('App', () => {
  const dispatch = jest.fn();
  beforeEach(() => {
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      items,
    }));
  });

  it('renders Title', () => {
    const { container } = render(<App />);

    expect(container).toHaveTextContent('당근 마켓');
  });
});
