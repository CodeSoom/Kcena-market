import React from 'react';

import { render } from '@testing-library/react';

import Loading from './Loading';

describe('Loading component', () => {
  function renderLoading({ isLoading }) {
    return render(<Loading isLoading={isLoading} />);
  }

  context('when isLoading is true', () => {
    it('show loading component', () => {
      const { getByTestId } = renderLoading({ isLoading: true });

      const backdrop = getByTestId('backdrop');

      expect(backdrop).not.toHaveStyle('visibility : hidden');
    });
  });

  context('when isLoading is false', () => {
    it('doesn\'t render loading component', () => {
      const { getByTestId } = renderLoading({ isLoading: false });

      const backdrop = getByTestId('backdrop');

      expect(backdrop).toHaveStyle('visibility : hidden');
    });
  });
});
