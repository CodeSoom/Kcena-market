import { createSlice } from '@reduxjs/toolkit';

import {
  fetchProducts,
  fetchProduct,
} from './services/api';

const { actions, reducer: productReducer } = createSlice({
  name: 'productSlice',
  initialState: {
    product: null,
    products: [],
  },
  reducers: {
    setProducts(state, { payload: products }) {
      return {
        ...state,
        products,
      };
    },
    setProduct(state, { payload: product }) {
      return {
        ...state,
        product,
      };
    },
  },
});

export const {
  setProducts,
  setProduct,
} = actions;

export function loadInitProducts() {
  return async (dispatch) => {
    const products = await fetchProducts();
    dispatch(setProducts(products));
  };
}

export function loadProduct({ productId }) {
  return async (dispatch) => {
    const product = await fetchProduct(productId);
    dispatch(setProduct(product));
  };
}

export default productReducer;
