import React from 'react';

import { render } from '@testing-library/react';

import ArticleProfile from './ArticleProfile';

describe('ArticleProfile', () => {
  const user = {
    uid: '1234abcd',
    displayName: '홍 길동',
    email: 'tester@example.com',
  };

  it('render seller profile', () => {
    const { container } = render((
      <ArticleProfile user={user} region="인천" />
    ));

    expect(container).toHaveTextContent('홍 길동');
    expect(container).toHaveTextContent('tester@example.com');
  });
});
