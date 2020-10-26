import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import ImagePreview from './ImagePreview';

import { mockFiles, mockEmptyFiles } from '../../../fixtures/files';

describe('ImagePreview', () => {
  const handleDeleteImage = jest.fn();
  const handleDeleteAll = jest.fn();

  function renderImagePreview({ files }) {
    return render((
      <ImagePreview
        files={files}
        handleClickDeleteImage={handleDeleteImage}
        handleClickDeleteAllImage={handleDeleteAll}
      />
    ));
  }

  beforeEach(() => {
    handleDeleteImage.mockClear();
    handleDeleteAll.mockClear();
  });

  context('with images', () => {
    it('show images', () => {
      const { getByAltText } = renderImagePreview({ files: mockFiles });

      mockFiles.forEach((file) => {
        expect(getByAltText(file.name)).toHaveAttribute('src', file.preview);
      });
    });

    it('listen delete product images event', () => {
      const { getAllByText } = renderImagePreview({ files: mockFiles });

      const deleteButtons = getAllByText('Delete');

      deleteButtons.forEach((deleteButton) => {
        fireEvent.click(deleteButton);
        expect(handleDeleteImage).toBeCalled();
      });
    });

    it('listen delete all product images event', () => {
      const { getByText } = renderImagePreview({ files: mockFiles });

      const deleteAllButton = getByText('Delete all');

      fireEvent.click(deleteAllButton);

      expect(handleDeleteAll).toBeCalled();
    });
  });
});
