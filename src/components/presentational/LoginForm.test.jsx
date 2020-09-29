import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import LoginForm from './LoginForm';

describe('LoginForm', () => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();
  const handleGoogleSignin = jest.fn();

  beforeEach(() => {
    handleChange.mockClear();
    handleSubmit.mockClear();
    handleGoogleSignin.mockClear();
  });

  function renderLoginForm({ email, password } = {}, error = '') {
    return render((
      <LoginForm
        fields={{ email, password }}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onGoogleSignin={handleGoogleSignin}
        error={error}
      />
    ));
  }

  it('renders input controls', () => {
    const email = 'test@test';
    const password = '1234';

    const { getByLabelText } = renderLoginForm({ email, password });

    const controls = [
      { label: 'E-mail', value: email },
      { label: 'Password', value: password },
    ];

    controls.forEach(({ label, value }) => {
      const input = getByLabelText(label);
      expect(input.value).toBe(value);
    });
  });

  it('listens change events', () => {
    const { getByLabelText } = renderLoginForm();

    const controls = [
      { label: 'E-mail', name: 'email', value: 'tester@example.com' },
      { label: 'Password', name: 'password', value: 'test' },
    ];

    controls.forEach(({ label, name, value }) => {
      const input = getByLabelText(label);

      fireEvent.change(input, { target: { value } });

      expect(handleChange).toBeCalledWith({ name, value });
    });
  });

  it('renders "Log In" button', () => {
    const { getByText } = renderLoginForm();

    fireEvent.click(getByText('Log In'));

    expect(handleSubmit).toBeCalled();
  });

  it('renders "Sign in with Google" button', () => {
    const { getByText } = renderLoginForm();

    fireEvent.click(getByText('Sign in with Google'));

    expect(handleGoogleSignin).toBeCalled();
  });

  it('renders error message', () => {
    const { container, getByText } = renderLoginForm({}, 'Invaild');
    fireEvent.click(getByText('Log In'));
    expect(container).toHaveTextContent('Invaild');
  });
});
