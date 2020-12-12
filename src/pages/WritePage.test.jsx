import React from 'react';

import { render } from '@testing-library/react';

import { useDispatch } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';

import WritePage from './WritePage';

import { loadItem } from '../services/storage';

import { logInUser } from '../../fixtures/user';

jest.mock('react-redux');
jest.mock('../services/storage');

describe('WritePage', () => {
  const dispatch = jest.fn();

  function renderWritePage() {
    return render((
      <MemoryRouter>
        <WritePage />
      </MemoryRouter>
    ));
  }

  beforeEach(() => {
    useDispatch.mockImplementation(() => dispatch);
    loadItem.mockImplementation(() => given.user);
  });

  context('with user', () => {
    given('user', () => logInUser);
    it('render write page', () => {
      const { container } = renderWritePage();

      expect(container).toHaveTextContent('Write new product');
    });
  });

  context('without user', () => {
    given('user', () => null);
    it('render login page', () => {
      const { container } = renderWritePage();

      expect(container).not.toHaveTextContent('Write new product');
    });
  });
});
