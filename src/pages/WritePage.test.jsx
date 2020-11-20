import React from 'react';

import { render } from '@testing-library/react';

import { useSelector } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';

import WritePage from './WritePage';

import newProduct from '../../fixtures/newProduct';

import { loadItem } from '../services/storage';

jest.mock('react-redux');
jest.mock('../services/storage');

describe('WritePage', () => {
  function renderWritePage() {
    return render((
      <MemoryRouter>
        <WritePage />
      </MemoryRouter>
    ));
  }

  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      productReducer: {
        newProduct,
      },
    }));
    loadItem.mockImplementation(() => given.mockUser);
  });

  context('with user', () => {
    given('mockUser', () => ({
      email: 'tester@example.com',
      displayName: 'tester',
      uid: '123456',
    }));
    it('render write page', () => {
      const { container } = renderWritePage();

      expect(container).toHaveTextContent('Write new product');
    });
  });

  context('without user', () => {
    given('mockUser', () => null);
    it('render login page', () => {
      const { container } = renderWritePage();

      expect(container).not.toHaveTextContent('Write new product');
    });
  });
});
