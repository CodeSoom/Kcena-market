import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import LoginFormContainer from './LoginFormContainer';

jest.mock('react-redux');
describe('LoginFormContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      authReducer: {
        loginFields: {
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
        <LoginFormContainer />
      ));

      expect(getByLabelText(/E-mail/).value).toBe('test@test');
      expect(getByLabelText(/Password/).value).toBe('1234');
    });

    it('listens change events', () => {
      const { getByLabelText } = render((
        <LoginFormContainer />
      ));

      expect(getByLabelText(/E-mail/).value).toBe('test@test');

      fireEvent.change(getByLabelText(/E-mail/), {
        target: { value: 'new email' },
      });

      expect(dispatch).toBeCalledWith({
        type: 'authentication/changeLoginField',
        payload: { name: 'email', value: 'new email' },
      });
    });

    it('renders "Log In" button', () => {
      const { getByText } = render((
        <LoginFormContainer />
      ));

      fireEvent.click(getByText('Log In'));

      expect(dispatch).toBeCalled();
    });

    it('renders "Sign in with Google" button', () => {
      const { getByText } = render((
        <LoginFormContainer />
      ));

      fireEvent.click(getByText('Sign in with Google'));

      expect(dispatch).toBeCalled();
    });
  });

  context('when input invaild login fields', () => {
    given('error', () => 'Invaild');
    given('user', () => ({
      displayName: '',
      uid: '',
    }));

    it('renders error message', () => {
      const { container, getByText } = render((
        <LoginFormContainer />
      ));

      fireEvent.click(getByText('Log In'));

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
        <LoginFormContainer />
      ));
      expect(getByText('Log out')).not.toBeNull();

      fireEvent.click(getByText('Log out'));

      expect(dispatch).toBeCalled();
    });
  });
});
