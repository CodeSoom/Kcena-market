import React from 'react';

import {
  CardItem,
  CardLink,
  CardArticle,
  CardImage,
  CardDescription,
} from '../../styles/Card';

export default function Product({ product, onClickProduct }) {
  const {
    id, title, productImages, region, price,
  } = product;

  const { name, imageUrl } = productImages[0] || {
    name: 'placeholder',
    imageUrl: 'https://via.placeholder.com/300',
  };

  function handleClick(selectedProduct) {
    return (event) => {
      event.preventDefault();
      onClickProduct(selectedProduct);
    };
  }

  return (
    <CardItem>
      <CardArticle>
        <CardLink href={`/products/${id}`} onClick={handleClick(product)}>
          <CardImage url={imageUrl}>
            <img src={imageUrl} alt={name} />
          </CardImage>
          <CardDescription>
            <CardDescription.Title>{title}</CardDescription.Title>
            <CardDescription.Region>{region}</CardDescription.Region>
            <CardDescription.Price>{`${price}원`}</CardDescription.Price>
          </CardDescription>
        </CardLink>
      </CardArticle>
    </CardItem>
  );
}
