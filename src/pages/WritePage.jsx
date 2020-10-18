import React from 'react';

import WriteFormContainer from '../components/container/WriteFormContainer';
import ImagesDropzoneContainer from '../components/container/ImagesDropzoneContainer';

export default function WritePage() {
  return (
    <>
      <h2>Write new product</h2>
      <ImagesDropzoneContainer />
      <WriteFormContainer />
    </>
  );
}
