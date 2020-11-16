import React from 'react';

import { fireEvent, render, waitFor } from '@testing-library/react';

import LoginForm from './LoginForm';

describe('LoginForm', () => {
  const handleSubmit = jest.fn();
  const handleGoogleSignIn = jest.fn();

  const controls = [
    { control: 'input', name: 'email', text: 'tester@example.com' },
    { control: 'input', name: 'password', text: '1234abcd' },
  ];

  beforeEach(() => {
    handleSubmit.mockClear();
    handleGoogleSignIn.mockClear();
  });

  function renderLoginForm(error = '') {
    return render((
      <LoginForm
        loginError={error}
        onSubmit={handleSubmit}
        onGoogleSignIn={handleGoogleSignIn}
      />
    ));
  }

  it('render input form controls', () => {
    const { container } = renderLoginForm();

    controls.forEach(({ control, name }) => {
      const input = container.querySelector(`${control}[name=${name}]`);

      expect(input).not.toBeNull();
    });
  });

  it('renders "Sign in with Google" button', () => {
    const { getByText } = renderLoginForm();

    fireEvent.click(getByText('Sign in with Google'));

    expect(handleGoogleSignIn).toBeCalled();
  });

  context('when all forms are filled', () => {
    it('possible submit event', async () => {
      const { container } = renderLoginForm();

      const email = container.querySelector('input[name="email"]');
      const password = container.querySelector('input[name="password"]');

      await waitFor(() => {
        fireEvent.change(email, {
          target: {
            value: 'tester@example.com',
          },
        });
        fireEvent.change(password, {
          target: {
            value: '1234abcd',
          },
        });
      });

      const submit = container.querySelector('button[type="submit"]');

      await waitFor(() => {
        fireEvent.click(submit);
      });

      expect(handleSubmit).toHaveBeenCalledWith({
        loginFields: {
          email: 'tester@example.com',
          password: '1234abcd',
        },
      });
    });
  });

  context('When invaild email and password format', () => {
    it('show email validation', async () => {
      const { container } = renderLoginForm();

      const submit = container.querySelector('button[type="submit"]');

      const email = container.querySelector('input[name="email"]');
      const password = container.querySelector('input[name="password"]');

      await waitFor(() => {
        fireEvent.change(email, {
          target: {
            value: 'tester@',
          },
        });
        fireEvent.change(password, {
          target: {
            value: '1234',
          },
        });
      });

      await waitFor(() => {
        fireEvent.click(submit);
      });

      expect(container).toHaveTextContent(/잘못된 이메일 형식입니다./);
      expect(container).toHaveTextContent(/비밀번호는 최소 6자리의 숫자\/문자 조합이어야 합니다./);
    });
  });

  context('when request login fail', () => {
    it('render error message', () => {
      const error = 'Error message';
      const { container } = renderLoginForm(error);

      expect(container).toHaveTextContent('Error message');
    });
  });
});
