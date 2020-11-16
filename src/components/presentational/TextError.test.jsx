import React from 'react';

import { render } from '@testing-library/react';
import TextError from './TextError';

describe('TextError', () => {
  it('render error message', () => {
    const { container } = render((
      <TextError>
        The password is invalid or the user does not have a password.
      </TextError>
    ));

    expect(container).toHaveTextContent('The password is invalid or the user does not have a password.');
  });
});
