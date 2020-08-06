import React from 'react';

export default function ProductDetail({ product }) {
  const { title, region, price } = product;

  return (
    <div>
      <h3>{title}</h3>
      <div>{region}</div>
      <div>{price}</div>
    </div>
  );
}
