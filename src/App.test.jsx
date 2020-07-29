import React from 'react';

import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('renders Title', () => {
    const { container } = render(<App />);

    expect(container).toHaveTextContent('당근 마켓');
  });
});
