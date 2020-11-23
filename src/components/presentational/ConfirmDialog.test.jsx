import React from 'react';

import { fireEvent, render, waitFor } from '@testing-library/react';

import ConfirmDialog from './ConfirmDialog';

describe('ConfirmDialog', () => {
  const setConfirmDialog = jest.fn();
  const mockOnConfirm = jest.fn();

  function renderConfirmDialog({ confirmDialog }) {
    return render((
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    ));
  }

  beforeEach(() => {
    setConfirmDialog.mockClear();
    mockOnConfirm.mockClear();
  });

  context('Dialog is opened', () => {
    const openConfirmDialog = {
      isOpen: true,
      title: '삭제하시겠습니까?',
      content: '삭제하면 되돌릴 수 없습니다.',
      onConfirm: mockOnConfirm,
    };

    it('render title and content', async () => {
      const { getByText } = renderConfirmDialog({ confirmDialog: openConfirmDialog });

      const title = await waitFor(() => getByText(openConfirmDialog.title));
      const content = await waitFor(() => getByText(openConfirmDialog.content));

      expect(title).toHaveTextContent(openConfirmDialog.title);
      expect(content).toHaveTextContent(openConfirmDialog.content);
    });

    it('render button', async () => {
      const { getByText } = renderConfirmDialog({ confirmDialog: openConfirmDialog });

      const yes = await waitFor(() => getByText('YES'));
      const no = await waitFor(() => getByText('NO'));

      expect(yes).not.toBeNull();
      expect(no).not.toBeNull();
    });

    it('listens close event', async () => {
      const { getByText } = renderConfirmDialog({ confirmDialog: openConfirmDialog });

      const no = await waitFor(() => getByText('NO'));

      fireEvent.click(no);

      expect(setConfirmDialog).toBeCalledWith({
        ...openConfirmDialog,
        isOpen: false,
      });
    });

    it('listens onConfirm event', async () => {
      const { getByText } = renderConfirmDialog({ confirmDialog: openConfirmDialog });

      const yes = await waitFor(() => getByText('YES'));

      fireEvent.click(yes);

      expect(mockOnConfirm).toBeCalled();
    });
  });

  context('Dialog is not opened', () => {
    const closeConfirmDialog = {
      isOpen: false,
      title: '',
      content: '',
    };

    it('doesn\'t render confirm dialog', async () => {
      const { container } = renderConfirmDialog({ confirmDialog: closeConfirmDialog });

      expect(container).not.toHaveTextContent('YES');
      expect(container).not.toHaveTextContent('NO');
    });
  });
});
