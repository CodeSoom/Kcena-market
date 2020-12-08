import React from 'react';

import { render } from '@testing-library/react';

import { useSelector, useDispatch } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';

import EditPage from './EditPage';

import { loadItem } from '../services/storage';

import { logInUser } from '../../fixtures/user';

import products from '../../fixtures/products';

jest.mock('../services/storage');
jest.mock('react-redux');

describe('EditPage', () => {
  const dispatch = jest.fn();

  function renderEditPage({ path }) {
    return render((
      <MemoryRouter initialEntries={[path]}>
        <EditPage />
      </MemoryRouter>
    ));
  }

  beforeEach(() => {
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      productReducer: {
        product: products[0],
      },
    }));
    loadItem.mockImplementation(() => given.user);
  });

  context('with user', () => {
    given('user', () => logInUser);
    it('render Edit Page title', () => {
      const { queryByText } = renderEditPage({ path: '/edit/1' });

      expect(queryByText('Edit product')).toBeInTheDocument();
    });
  });

  context('without user', () => {
    given('user', () => null);
    it('render login page', () => {
      const { container } = renderEditPage({ path: '/edit/1' });

      expect(container).not.toHaveTextContent('Edit product');
    });
  });
});
