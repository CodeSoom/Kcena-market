import React, { useContext } from 'react';

import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import ConfirmationContext, {
  ConfirmationProvider,
} from './ConfirmationContext';

describe('ConfirmationContext', () => {
  const title = '제목';
  const content = '내용';
  const open = '열기';

  function TestComponent() {
    const modal = useContext(ConfirmationContext);

    async function handleClick() {
      modal.setConfirmForm({ title, content });

      await modal.showConfirmation();
    }

    return (
      <button type="button" onClick={handleClick}>{open}</button>
    );
  }

  const renderTestComponent = () => render((
    <ConfirmationProvider>
      <TestComponent />
    </ConfirmationProvider>
  ));

  describe('Open modal', () => {
    it('shows title and content', () => {
      const { getByText, queryByText } = renderTestComponent();

      fireEvent.click(getByText(open));

      expect(queryByText(title)).toBeInTheDocument();
      expect(queryByText(content)).toBeInTheDocument();
    });
  });

  describe('Click cancel button', () => {
    it('close the modal', async () => {
      const { getByText, queryByText } = renderTestComponent();

      fireEvent.click(getByText(open));

      fireEvent.click(getByText('NO'));

      await waitForElementToBeRemoved(getByText(title));

      expect(queryByText(title)).not.toBeInTheDocument();
    });
  });

  describe('Click submit button', () => {
    it('close the modal', async () => {
      const { getByText, queryByText } = renderTestComponent();

      fireEvent.click(getByText(open));

      fireEvent.click(getByText('YES'));

      await waitForElementToBeRemoved(getByText(title));

      expect(queryByText(title)).not.toBeInTheDocument();
    });
  });
});
