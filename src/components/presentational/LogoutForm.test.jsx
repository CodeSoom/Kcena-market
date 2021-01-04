import React from 'react';

import { fireEvent, render, waitFor } from '@testing-library/react';

import LogoutForm from './LogoutForm';

import ConfirmationContext from '../../contexts/ConfirmationContext';

describe('LogoutForm', () => {
  const showConfirmation = jest.fn();
  const setConfirmForm = jest.fn();
  const handleClick = jest.fn();

  function renderLogoutForm() {
    return render((
      <ConfirmationContext.Provider
        value={{
          showConfirmation,
          setConfirmForm,
        }}
      >
        <LogoutForm onClick={handleClick} />
      </ConfirmationContext.Provider>
    ));
  }

  beforeEach(() => {
    handleClick.mockClear();
    setConfirmForm.mockClear();
  });

  it('renders "Log out" button', () => {
    const { container } = renderLogoutForm();

    expect(container).toHaveTextContent('Log out');
  });

  context('when user clicked "YES"', () => {
    beforeEach(() => {
      showConfirmation.mockImplementation(() => (
        Promise.resolve(true)
      ));
    });

    it('call handleClick', async () => {
      const { getByText } = renderLogoutForm();

      const button = getByText('Log out');

      fireEvent.click(button);

      expect(setConfirmForm).toBeCalledWith({
        title: '로그아웃 하시겠습니까?',
        content: '',
      });
      expect(showConfirmation).toBeCalled();
      await waitFor(() => expect(handleClick).toBeCalled());
    });
  });

  context('when user clicked "NO"', () => {
    beforeEach(() => {
      showConfirmation.mockImplementation(() => (
        Promise.resolve(false)
      ));
    });

    it('doesn\'t call handleClick', async () => {
      const { getByText } = renderLogoutForm();

      const button = getByText('Log out');

      fireEvent.click(button);

      expect(setConfirmForm).toBeCalledWith({
        title: '로그아웃 하시겠습니까?',
        content: '',
      });
      expect(showConfirmation).toBeCalled();
      await waitFor(() => expect(handleClick).not.toBeCalled());
    });
  });
});
