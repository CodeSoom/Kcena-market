import React from 'react';
import { useHistory } from 'react-router-dom';

import styled from '@emotion/styled';

import {
  Typography, Box,
} from '@material-ui/core';

import ProductsContainer from '../components/container/ProductsContainer';

export default function HomePage() {
  const history = useHistory();

  function handleClickProduct(product) {
    const url = `/products/${product.id}`;
    history.push(url);
  }

  return (
    <>
      <Typography
        variant="h4"
        component="h3"
        align="center"
      >
        <Box fontWeight="fontWeightBold" py={4}>
          Kcena Market 인기 매물
        </Box>
      </Typography>
      <TextLineDivider />
      <ProductsContainer
        onClickProduct={handleClickProduct}
      />
    </>
  );
}

const TextLineDivider = styled.div({
  width: '70px',
  borderTop: '2px solid #FF8A3D',
  margin: '0 auto',
  marginBottom: '50px',
});
