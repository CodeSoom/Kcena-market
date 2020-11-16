import React from 'react';

import { fireEvent, render, waitFor } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import LoginFormContainer from './LoginFormContainer';

jest.mock('react-redux');

describe('LoginFormContainer', () => {
  const dispatch = jest.fn();

  function renderLoginFormContainer() {
    return render(<LoginFormContainer />);
  }

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      authReducer: {
        error: given.error,
      },
    }));
  });

  context('when login request fail', () => {
    it('render error message', () => {
      given('error', () => 'Error message');
      const { container } = renderLoginFormContainer();

      expect(container).toHaveTextContent('Error message');
    });
  });

  context('when logged out', () => {
    it('renders input controls', () => {
      const { getByLabelText } = renderLoginFormContainer();

      expect(getByLabelText(/E-mail/)).not.toBeNull();
      expect(getByLabelText(/Password/)).not.toBeNull();
    });

    it('renders "Log In" button', async () => {
      const { container } = renderLoginFormContainer();

      const submit = container.querySelector('button[type="submit"]');

      expect(submit).not.toBeNull();
    });

    it('renders "Sign in with Google" button', () => {
      const { getByText } = renderLoginFormContainer();

      fireEvent.click(getByText('Sign in with Google'));

      expect(dispatch).toBeCalled();
    });
  });

  context('when all forms are filled', () => {
    it('possible submit event and call dispatch', async () => {
      const { container } = renderLoginFormContainer();

      const email = container.querySelector('input[name="email"]');
      const password = container.querySelector('input[name="password"]');

      await waitFor(() => {
        fireEvent.change(email,
          { target: { value: 'tester@example.com' } });
        fireEvent.change(password,
          { target: { value: '1234abcd' } });
      });

      const submit = container.querySelector('button[type="submit"]');

      await waitFor(() => {
        fireEvent.click(submit);
      });

      expect(dispatch).toBeCalled();
    });
  });
});
