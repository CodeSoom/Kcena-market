import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { render } from '@testing-library/react';

import { loadItem } from '../services/storage';

import SignupPage from './SignupPage';

jest.mock('react-redux');
jest.mock('../services/storage');

describe('SignupPage', () => {
  const dispatch = jest.fn();

  function renderSignupPage() {
    return render((
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>
    ));
  }

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      authReducer: {
        user: {
          displayName: '',
          uid: '',
        },
      },
    }));
    loadItem.mockImplementation(() => given.mockUser);
  });

  context('with user', () => {
    given('mockUser', () => ({
      displayName: 'tester',
      uid: '1234',
    }));
    it('doesn\'t render signup page', () => {
      const { container } = renderSignupPage();

      expect(container).not.toHaveTextContent('Sign up');
    });
  });

  context('without user', () => {
    given('mockUser', () => null);
    it('render signup page', () => {
      const { container } = renderSignupPage();

      expect(container).toHaveTextContent('Sign up');
    });
  });
});
