import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
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

  it('clicked go home page', () => {
    const { container, getByText } = render((
      <MemoryRouter initialEntries={['/products/1']}>
        <Header />
      </MemoryRouter>
    ));
  });
});
