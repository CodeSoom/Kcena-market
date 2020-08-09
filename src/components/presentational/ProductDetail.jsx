import React from 'react';
import styled from '@emotion/styled';
import Slider from 'react-slick';

import {
  NextArrow,
  PrevArrow,
} from '../../styles/SliderArrow';

const Article = styled.article({
});

const ArticleImages = styled.section({
  padding: '3em',
  '& img': {
    margin: 'auto',
  },
  '& .slick-prev:before, .slick-next:before': {
    display: 'none',
  },
  '& .slick-arrow': {
    zIndex: 10,
    width: '60px',
    height: '60px',
  },
  '& .slick-dots li': {
    margin: '0 0.5em',
  },
  '& .slick-dots li button:before': {
    fontFamily: 'none',
    left: '-10px',
    fontSize: '3rem',
  },
});

const ArticleProfile = styled.section({
  padding: '0 32px',
});

const ArticleDescription = styled.section({
  padding: '32px',
  '& h1': {
    fontSize: '2rem',
  },
  '& pre': {
    margin: '32px 0',
  },
});

export default function ProductDetail({ product }) {
  const {
    title, productImages, region, price, description,
  } = product;

  return (
    <Article>
      <ArticleImages>
        <Slider
          dots
          fade
          infinite
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          nextArrow={<NextArrow />}
          prevArrow={<PrevArrow />}
        >
          {productImages.map((imageUrl) => (
            <div key={imageUrl}>
              <img src={imageUrl} alt={imageUrl} />
            </div>
          ))}
        </Slider>
      </ArticleImages>
      <ArticleProfile>
        <div>{`지역 : ${region}`}</div>
      </ArticleProfile>
      <ArticleDescription>
        <h1>{title}</h1>
        <div>{`가격 : ${price}원`}</div>
        <div>
          <pre>
            {description}
          </pre>
        </div>
      </ArticleDescription>
    </Article>
  );
}
