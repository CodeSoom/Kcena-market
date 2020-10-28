import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import ImagePreview from './ImagePreview';

import { mockFiles } from '../../../fixtures/files';

describe('ImagePreview', () => {
  const handleDeleteImage = jest.fn();

  function renderImagePreview({ files }) {
    return render((
      <ImagePreview
        files={files}
        handleClickDeleteImage={handleDeleteImage}
      />
    ));
  }

  beforeEach(() => {
    handleDeleteImage.mockClear();
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
  });
});
