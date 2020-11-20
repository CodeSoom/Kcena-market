import React from 'react';
import styled from '@emotion/styled';
import Slider from 'react-slick';

import Container from '@material-ui/core/Container';

import {
  PrevArrow,
  NextArrow,
} from '../../styles/SliderArrow';

import useStyles from '../../styles/styles';

import ArticleProfile from './ArticleProfile';

export default function ProductDetail({ product }) {
  const {
    productImages, title, region, price, description, user,
  } = product;
  const classes = useStyles();

  return (
    <Container
      component="article"
      maxWidth="md"
      className={classes.productDetail}
    >
      <SliderWrap>
        <Slider
          dots
          lazyLoad
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          prevArrow={<PrevArrow />}
          nextArrow={<NextArrow />}
        >
          {productImages.map((imageUrl) => (
            <a href={imageUrl} key={imageUrl}>
              <ImageWrap>
                <Image src={imageUrl} alt={imageUrl} />
              </ImageWrap>
            </a>
          ))}
        </Slider>
      </SliderWrap>
      <ArticleProfile user={user} region={region} />
      <ArticleDescription>
        <h1 className="article article-title">{title}</h1>
        <p className="article article-price">{`${price}원`}</p>
        <p className="article article-description">{description}</p>
      </ArticleDescription>
    </Container>
  );
}

const ImageWrap = styled.div({
  position: 'relative',
  overflow: 'hidden',
  width: '677px',
  margin: '0 auto',
  height: '500px',
  borderRadius: '8px',
});

const SliderWrap = styled.div({
  '& .slick-slider': {
    height: '500px',
  },
  '& .slick-dots': {
    position: 'relative',
    margin: '0 auto',
    backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))',
    backgroundBlendMode: 'multiply',
    width: '677px',
    padding: '12px 0',
    bottom: '57px',
    borderRadius: '8px',
    '& li': {
      listStyle: 'none',
      cursor: 'pointer',
    },
    '& li button': {
      border: 'none',
      background: '#4f5052',
      color: 'transparent',
      cursor: 'pointer',
      display: 'block',
      height: '15px',
      width: '15px',
      borderRadius: '7.5px',
    },
    '& li.slick-active button': {
      backgroundColor: '#fff',
    },
    '& li button:before': {
      content: 'none',
    },
  },
});

const Image = styled.img({
  position: 'absolute',
  minWidth: '100%',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  color: 'transparent',
});

const ArticleDescription = styled.section({
  padding: '32px 0',
  width: '677px',
  margin: '0 auto',
  borderBottom: '1px solid #e9ecef',
  '& .article': {
    marginTop: '5px',
  },
  '& .article-title': {
    marginTop: 0,
    fontSize: '20px',
    fontWeight: '600',
    lineHeight: '1.5',
  },
  '& .article-price': {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  '& .article-description': {
    fontSize: '17px',
    whiteSpace: 'pre-wrap',
    margin: '10px 0',
  },
});
