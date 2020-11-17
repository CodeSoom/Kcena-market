import React from 'react';
import styled from '@emotion/styled';
import Slider from 'react-slick';

import Container from '@material-ui/core/Container';

import {
  PrevArrow,
  NextArrow,
} from '../../styles/SliderArrow';

import useStyles from '../../styles/styles';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function ProductDetail({ product }) {
  const {
    title, productImages, region, price, description,
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
          infinite
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          prevArrow={<PrevArrow />}
          nextArrow={<NextArrow />}
        >
          {productImages.map((imageUrl) => (
            <a href={imageUrl} key={imageUrl}>
              <div>
                <ImageWrap>
                  <Image src={imageUrl} alt={imageUrl} />
                </ImageWrap>
              </div>
            </a>
          ))}
        </Slider>
      </SliderWrap>
      <div>{`지역 : ${region}`}</div>
      <h1>{title}</h1>
      <div>{`가격 : ${price}원`}</div>
      <div>
        <pre>
          {description}
        </pre>
      </div>
    </Container>
  );
}

const ImageWrap = styled.div({
  position: 'relative',
  overflow: 'hidden',
  width: '677px',
  margin: '0 auto',
  height: '500px',
});

const SliderWrap = styled.div({
  position: 'relative',
  '& .slick-dots': {
    position: 'absolute',
    bottom: '3px',
    left: '49px',
    width: '677px',
    paddingTop: '16px',
    paddingBottom: '16px',
    borderRadius: '8px',
    listStyle: 'none',
    textAlign: 'center',
    backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))',
    backgroundBlendMode: 'multiply',
  },
  '& .slick-dots li button:before': {
    fontSize: '40px',
  },
});

const Image = styled.img({
  position: 'absolute',
  borderRadius: '8px',
  minWidth: '100%',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  color: 'transparent',
});
