import React from 'react';

import { render } from '@testing-library/react';

import ImagePreview from './ImagePreview';

describe('ImagePreview', () => {
  function renderImagePreview({ files }) {
    return render((
      <ImagePreview files={files} />
    ));
  }

  context('with images', () => {
    it('show images', () => {
      const files = [
        { name: 'testImage1', preview: 'testurl1' },
        { name: 'testImage2', preview: 'testurl2' },
        { name: 'testImage3', preview: 'testurl3' },
      ];

      const { getByAltText } = renderImagePreview({ files });

      files.forEach((file) => {
        expect(getByAltText(file.name)).toHaveAttribute('src', file.preview);
      });
    });
  });

  context('without images', () => {
    it('show empty image message', () => {
      const files = [];

      const { getByText } = renderImagePreview({ files });

      expect(getByText('상품 이미지를 올려주세요!')).not.toBeNull();
    });
  });
});
