import React from 'react';

import { fireEvent, render, waitFor } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import SignupFormContainer from './SignupFormContainer';

jest.mock('react-redux');

describe('SignupFormContainer', () => {
  const dispatch = jest.fn();

  function renderSignupFormContainer() {
    return render(<SignupFormContainer />);
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

  context('when sign up request fail', () => {
    it('render error message', () => {
      given('error', () => 'Error message');
      const { container } = renderSignupFormContainer();

      expect(container).toHaveTextContent('Error message');
    });
  });

  context('without user', () => {
    it('renders input controls', () => {
      const { getByLabelText } = renderSignupFormContainer();

      expect(getByLabelText(/E-mail/)).not.toBeNull();
      expect(getByLabelText(/Password/)).not.toBeNull();
    });

    it('renders "Sign up" button', async () => {
      const { container } = renderSignupFormContainer();

      const submit = container.querySelector('button[type="submit"]');

      expect(submit).not.toBeNull();
    });
  });

  context('when all forms are filled', () => {
    it('possible submit event and call dispatch', async () => {
      const { container } = renderSignupFormContainer();

      const firstName = container.querySelector('input[name="firstName"]');
      const lastName = container.querySelector('input[name="lastName"]');
      const email = container.querySelector('input[name="email"]');
      const password = container.querySelector('input[name="password"]');

      await waitFor(() => {
        fireEvent.change(firstName,
          { target: { value: '홍' } });
        fireEvent.change(lastName,
          { target: { value: '길동' } });
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
