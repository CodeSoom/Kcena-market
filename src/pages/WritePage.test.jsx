import React from 'react';

import { render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import WritePage from './WritePage';

describe('WritePage', () => {
  it('render', () => {
    const { container } = render((
      <MemoryRouter>
        <WritePage />
      </MemoryRouter>
    ));

    expect(container).toHaveTextContent('Write Page');
  });
});
