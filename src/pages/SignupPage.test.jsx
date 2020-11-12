import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import { loadItem } from '../services/storage';

import SignupPage from './SignupPage';

jest.mock('react-redux');
jest.mock('../services/storage');

describe('SignupPage', () => {
  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      authReducer: {
        signupFields: {
          email: 'test@test',
          password: '1234',
        },
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
    it('doesn\'t render login page', () => {
      const { container } = render((
        <MemoryRouter>
          <SignupPage />
        </MemoryRouter>
      ));

      expect(container).not.toHaveTextContent('Sign up');
    });
  });

  context('without user', () => {
    given('mockUser', () => null);
    it('render login page', () => {
      const { container } = render((
        <MemoryRouter>
          <SignupPage />
        </MemoryRouter>
      ));

      expect(container).toHaveTextContent('Sign up');
    });
  });
});
