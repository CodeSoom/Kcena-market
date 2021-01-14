import React from 'react';

import { render } from '@testing-library/react';

import ArticleProfile from './ArticleProfile';

import { logInUser } from '../../../fixtures/user';

describe('ArticleProfile', () => {
  it('render seller profile', () => {
    const { displayName, email } = logInUser;
    const { container } = render((
      <ArticleProfile user={logInUser} region="인천" />
    ));

    expect(container).toHaveTextContent(displayName);
    expect(container).toHaveTextContent(email);
  });
});
