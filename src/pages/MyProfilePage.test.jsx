import React from 'react';

import { render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import MyProfilePage from './MyProfilePage';

import { loadItem } from '../services/storage';

jest.mock('../services/storage');

jest.mock('react-redux');
describe('MyProfilePage', () => {
  const dispatch = jest.fn();

  function renderWritePage() {
    return render((
      <MemoryRouter>
        <MyProfilePage />
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
    it('render MyProfilePaga', () => {
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
