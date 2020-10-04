import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import SignupPage from './SignupPage';

jest.mock('react-redux');

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
  });

  it('renders Sign-up title', () => {
    const { container } = render((
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>
    ));

    expect(container).toHaveTextContent('Sign up');
  });

  it('renders input controls', () => {
    const { getByLabelText } = render((
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>
    ));

    expect(getByLabelText('E-mail')).not.toBeNull();
  });
});
