import React from 'react';
import { useParams } from 'react-router-dom';
import ProductContainer from '../components/container/ProductContainer';

export default function ProductPage({ params }) {
  const { id } = params || useParams();

  return (
    <ProductContainer productId={id} />
  );
}
