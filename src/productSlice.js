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
    newProduct: {
      title: '',
      description: '',
    },
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
    writeNewProduct(state, { payload: { name, value } }) {
      return {
        ...state,
        newProduct: {
          ...state.newProduct,
          [name]: value,
        },
      };
    },
  },
});

export const {
  setProducts,
  setProduct,
  writeNewProduct,
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

export function postProduct() {
  return async (dispatch) => {
    // TODO...
  };
}

export default productReducer;
