import React from 'react';

export default function Item({ item }) {
  const { title, address, price } = item;

  return (
    <li>
      <div>{title}</div>
      <div>{address}</div>
      <div>{price}</div>
    </li>
  );
}
