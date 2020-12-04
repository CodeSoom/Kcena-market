import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import EditButton from './EditButton';

describe('EditButton', () => {
  const handleClickEdit = jest.fn();

  function renderEditButton() {
    return render((
      <EditButton handleClickEdit={handleClickEdit} />
    ));
  }

  it('render edit button', () => {
    const { queryByText } = renderEditButton();

    expect(queryByText('Edit')).toBeInTheDocument();
  });

  it('listen click event', () => {
    const { getByText } = renderEditButton();

    fireEvent.click(getByText('Edit'));

    expect(handleClickEdit).toBeCalled();
  });
});
