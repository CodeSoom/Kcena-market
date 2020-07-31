import React from 'react';

export default function List({ items }) {
  if (!(items || []).length) {
    return (
      <p>품목이 없습니다!</p>
    );
  }

  return (
    <ul>
      {items.map(({
        id, title, address, price,
      }) => (
        <li key={id}>
          <div>{title}</div>
          <div>{address}</div>
          <div>{price}</div>
        </li>
      ))}
    </ul>
  );
}
