import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import ImagePreview from './ImagePreview';

import productImages from '../../../fixtures/productImages';

describe('ImagePreview', () => {
  const handleDeleteImage = jest.fn();

  function renderImagePreview() {
    return render((
      <ImagePreview
        productImages={productImages}
        handleClickDeleteImage={handleDeleteImage}
      />
    ));
  }

  beforeEach(() => {
    handleDeleteImage.mockClear();
  });

  context('with images', () => {
    it('show images', () => {
      const { getByAltText } = renderImagePreview();

      productImages.forEach(({ name, imageUrl }) => {
        expect(getByAltText(name)).toHaveAttribute('src', imageUrl);
      });
    });

    it('listen delete product images event', () => {
      const { getAllByLabelText } = renderImagePreview();

      const deleteButtons = getAllByLabelText('delete');

      deleteButtons.forEach((deleteButton) => {
        fireEvent.click(deleteButton);
        expect(handleDeleteImage).toBeCalled();
      });
    });
  });
});
