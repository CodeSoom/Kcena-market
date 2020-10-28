import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import SignupFormContainer from './SignupFormContainer';

jest.mock('react-redux');
describe('SignupFormContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      authReducer: {
        signupFields: {
          email: 'test@test',
          password: '1234',
        },
        user: given.user,
        error: given.error,
      },
    }));
  });

  context('when logged out', () => {
    given('user', () => ({
      displayName: '',
      uid: '',
    }));
    it('renders input controls', () => {
      const { getByLabelText } = render((
        <SignupFormContainer />
      ));

      expect(getByLabelText(/E-mail/).value).toBe('test@test');
      expect(getByLabelText(/Password/).value).toBe('1234');
    });

    it('listens change events', () => {
      const { getByLabelText } = render((
        <SignupFormContainer />
      ));

      expect(getByLabelText(/E-mail/).value).toBe('test@test');

      fireEvent.change(getByLabelText(/E-mail/), {
        target: { value: 'new email' },
      });

      expect(dispatch).toBeCalledWith({
        type: 'authentication/changeSignupField',
        payload: { name: 'email', value: 'new email' },
      });
    });

    it('renders "Sign up" button', () => {
      const { getByText } = render((
        <SignupFormContainer />
      ));

      fireEvent.click(getByText('Sign up'));

      expect(dispatch).toBeCalled();
    });
  });

  context('when input invaild signup fields', () => {
    given('error', () => 'Invaild');
    given('user', () => ({
      displayName: '',
      uid: '',
    }));

    it('renders error message', () => {
      const { container, getByText } = render((
        <SignupFormContainer />
      ));

      fireEvent.click(getByText('Sign up'));

      expect(container).toHaveTextContent('Invaild');
    });
  });

  context('when logged in', () => {
    given('user', () => ({
      displayName: 'tester',
      uid: '123456',
    }));

    it('renders "Log out" button', () => {
      const { getByText } = render((
        <SignupFormContainer />
      ));
      expect(getByText('Log out')).not.toBeNull();

      fireEvent.click(getByText('Log out'));

      expect(dispatch).toBeCalled();
    });
  });
});
