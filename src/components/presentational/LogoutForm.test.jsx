import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import LogoutForm from './LogoutForm';

describe('LogoutForm', () => {
  it('renders "Log out" button', () => {
    const handleClick = jest.fn();

    const { container, getByText } = render((
      <LogoutForm onClick={handleClick} />
    ));

    expect(container).toHaveTextContent('Log out');

    fireEvent.click(getByText('Log out'));

    expect(handleClick).toBeCalled();
  });
});
