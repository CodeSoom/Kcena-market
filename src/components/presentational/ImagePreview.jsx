import React from 'react';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  margin: '16px 0',
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
  flexFlow: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

export default function ImagePreview({
  files, handleClickDeleteImage, handleClickDeleteAllImage,
}) {
  if (files.length === 0) {
    return null;
  }

  return (
    <aside style={thumbsContainer}>
      {files.map((file) => (
        <div style={thumb} key={file.id}>
          <div style={thumbInner}>
            <img
              alt={file.name}
              src={file.preview}
              style={img}
            />
            <button
              type="button"
              onClick={() => handleClickDeleteImage(file)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={handleClickDeleteAllImage}
      >
        Delete all
      </button>
    </aside>
  );
}
