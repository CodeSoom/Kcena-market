import React from 'react';

import { isEmpty } from '../../utils';

export default function TableForm(
  { products, handleDeleteProduct },
) {
  if (isEmpty(products || [])) {
    return (
      <div>품목이 없습니다!</div>
    );
  }

  return (
    <ul>
      {products.map(({ id, title }) => (
        <li key={id}>
          {title}
          <button
            type="button"
            onClick={() => handleDeleteProduct(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
