import React from 'react';

export default function WriteForm({ newProduct, onChange, onSubmit }) {
  const {
    title, description, price, region,
  } = newProduct;

  function handleChange(event) {
    const { target: { name, value } } = event;
    onChange({ name, value });
  }

  return (
    <>
      <div>
        <label htmlFor="write-title">Title</label>
        <div>
          <input
            id="write-title"
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label htmlFor="write-description">Description</label>
        <div>
          <textarea
            id="write-description"
            type="text"
            name="description"
            rows="5"
            value={description}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label htmlFor="write-price">Price</label>
        <div>
          <input
            id="write-price"
            type="number"
            name="price"
            value={price}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label htmlFor="write-region">Region</label>
        <div>
          <input
            id="write-region"
            type="text"
            name="region"
            value={region}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={onSubmit}
        >
          글쓰기
        </button>
      </div>
    </>
  );
}
