import React from 'react';

export default function SignupForm({
  fields, onChange, onSubmit, error,
}) {
  const { email, password } = fields;

  function handleChange(event) {
    const { target: { name, value } } = event;
    onChange({ name, value });
  }

  return (
    <>
      <div>
        <p>{error}</p>
      </div>
      <div>
        <label htmlFor="signup-email">E-mail</label>
        <input
          id="signup-email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="signup-password">Password</label>
        <input
          id="signup-password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </div>
      <button
        type="button"
        onClick={onSubmit}
      >
        Sign up
      </button>
    </>
  );
}
