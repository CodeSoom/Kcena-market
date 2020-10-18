import React from 'react';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

export default function ImagePreview({ files }) {
  if (files.length === 0) {
    return (
      <p>상품 이미지를 올려주세요!</p>
    );
  }

  return (
    <aside style={thumbsContainer}>
      {files.map((file) => (
        <div style={thumb} key={file.name}>
          <div style={thumbInner}>
            <img
              alt={file.name}
              src={file.preview}
              style={img}
            />
          </div>
        </div>
      ))}
    </aside>
  );
}
