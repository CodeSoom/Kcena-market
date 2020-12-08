import React from 'react';

import { render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import EditPage from './EditPage';

import { loadItem } from '../services/storage';

import { logInUser } from '../../fixtures/user';

jest.mock('../services/storage');

describe('EditPage', () => {
  function renderEditPage({ path }) {
    return render((
      <MemoryRouter initialEntries={[path]}>
        <EditPage />
      </MemoryRouter>
    ));
  }

  beforeEach(() => {
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
