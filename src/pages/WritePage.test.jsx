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
  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      productReducer: {
        newProduct,
      },
    }));
  });

  context('with user', () => {
    const mockUser = {
      displayName: 'tester',
      uid: '123456',
    };

    beforeEach(() => {
      loadItem.mockImplementation(() => mockUser);
    });

    it('render write page', () => {
      const { container } = render((
        <MemoryRouter>
          <WritePage />
        </MemoryRouter>
      ));

      expect(container).toHaveTextContent('Write new product');
    });
  });

  context('without user', () => {
    const mockUser = null;

    beforeEach(() => {
      loadItem.mockImplementation(() => mockUser);
    });

    it('render login page', () => {
      const { container } = render((
        <MemoryRouter>
          <WritePage />
        </MemoryRouter>
      ));

      expect(container).not.toHaveTextContent('Write new product');
    });
  });
});
