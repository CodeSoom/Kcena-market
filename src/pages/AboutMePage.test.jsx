import React from 'react';

import { render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import AboutMePage from './AboutMePage';

import { loadItem } from '../services/storage';

jest.mock('../services/storage');

jest.mock('react-redux');
describe('AboutMePage', () => {
  const dispatch = jest.fn();

  function renderWritePage() {
    return render((
      <MemoryRouter>
        <AboutMePage />
      </MemoryRouter>
    ));
  }

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      productReducer: {
        myProducts: [],
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
    it('render AboutMePage', () => {
      const { container } = renderWritePage();

      expect(container).toHaveTextContent('내 정보');
    });
  });

  context('without user', () => {
    given('mockUser', () => null);
    it('render login page', () => {
      const { container } = renderWritePage();

      expect(container).not.toHaveTextContent('내 정보');
    });
  });
});
