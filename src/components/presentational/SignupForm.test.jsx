import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import SignupForm from './SignupForm';

describe('SignupForm', () => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();

  beforeEach(() => {
    handleChange.mockClear();
    handleSubmit.mockClear();
  });

  function renderSignupForm({ email, password } = {}, error = '') {
    return render((
      <SignupForm
        fields={{ email, password }}
        onChange={handleChange}
        onSubmit={handleSubmit}
        error={error}
      />
    ));
  }

  it('renders input controls', () => {
    const email = 'test@test';
    const password = '1234';

    const { getByLabelText } = renderSignupForm({ email, password });

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
    const { getByLabelText } = renderSignupForm();

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

  it('renders "Sign up" button', () => {
    const { getByText } = renderSignupForm();

    fireEvent.click(getByText('Sign up'));

    expect(handleSubmit).toBeCalled();
  });

  it('renders error message', () => {
    const { container, getByText } = renderSignupForm({}, 'Invaild');
    fireEvent.click(getByText('Sign up'));
    expect(container).toHaveTextContent('Invaild');
  });
});
