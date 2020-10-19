import React from 'react';

import { render } from '@testing-library/react';

import ImagesDropzoneContainer from './ImagesDropzoneContainer';

describe('ImagesDropzoneContainer', () => {
  function renderImagesDropzoneContainer() {
    return render((
      <ImagesDropzoneContainer />
    ));
  }

  it('render image dropzone', () => {
    const { container } = renderImagesDropzoneContainer();

    expect(container).toHaveTextContent('Drag and drop some files here, or click to select files');
  });
});
