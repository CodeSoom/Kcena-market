import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Header from './Header';

describe('Header', () => {
  it('render title', () => {
    const { container } = render((
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    ));

    expect(container).toHaveTextContent('Kcena Market');
  });
});
