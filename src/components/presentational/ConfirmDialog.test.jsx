import React from 'react';

import { fireEvent, render, waitFor } from '@testing-library/react';

import ConfirmDialog from './ConfirmDialog';

describe('ConfirmDialog', () => {
  function renderConfirmDialog({
    isOpen, title, content, onConfirm, onCancel,
  }) {
    return render((
      <ConfirmDialog
        isOpen={isOpen}
        title={title}
        content={content}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    ));
  }

  const onConfirm = jest.fn();
  const onCancel = jest.fn();

  beforeEach(() => {
    onConfirm.mockClear();
    onCancel.mockClear();
  });

  context('Dialog is opened', () => {
    const openConfirmDialog = {
      isOpen: true,
      title: '삭제하시겠습니까?',
      content: '삭제하면 되돌릴 수 없습니다.',
      onConfirm,
      onCancel,
    };

    it('render title and content', async () => {
      const { getByText } = renderConfirmDialog(openConfirmDialog);

      const title = await waitFor(() => getByText(openConfirmDialog.title));
      const content = await waitFor(() => getByText(openConfirmDialog.content));

      expect(title).toHaveTextContent(openConfirmDialog.title);
      expect(content).toHaveTextContent(openConfirmDialog.content);
    });

    it('render button', async () => {
      const { getByText } = renderConfirmDialog(openConfirmDialog);

      const yes = await waitFor(() => getByText('YES'));
      const no = await waitFor(() => getByText('NO'));

      expect(yes).not.toBeNull();
      expect(no).not.toBeNull();
    });

    it('listens close event', async () => {
      const { getByText } = renderConfirmDialog(openConfirmDialog);

      const no = await waitFor(() => getByText('NO'));

      fireEvent.click(no);

      expect(onCancel).toBeCalled();
    });

    it('listens onConfirm event', async () => {
      const { getByText } = renderConfirmDialog(openConfirmDialog);

      const yes = await waitFor(() => getByText('YES'));

      fireEvent.click(yes);

      expect(onConfirm).toBeCalled();
    });
  });

  context('Dialog is not opened', () => {
    const closeConfirmDialog = {
      isOpen: false,
      title: '',
      content: '',
      onConfirm,
      onCancel,
    };

    it('doesn\'t render confirm dialog', async () => {
      const { container } = renderConfirmDialog(closeConfirmDialog);

      expect(container).not.toHaveTextContent('YES');
      expect(container).not.toHaveTextContent('NO');
    });
  });
});
