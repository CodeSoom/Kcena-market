import React from 'react';

import { render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import EditButton from './EditButton';

describe('EditButton', () => {
  function renderEditButton() {
    return render((
      <MemoryRouter initialEntries={['/aboutme']}>
        <EditButton productId="1" />
      </MemoryRouter>
    ));
  }

  it('render edit button', () => {
    const { queryByText } = renderEditButton();

    expect(queryByText('Edit')).toBeInTheDocument();
  });
});
