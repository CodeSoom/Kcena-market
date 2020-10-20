import { createSlice } from '@reduxjs/toolkit';

import {
  fetchProducts,
  fetchProduct,
  postProductFireStore,
  uploadProductImages,
} from './services/api';

const initialStateNewProduct = {
  title: '',
  description: '',
  price: '',
  region: '',
};

const { actions, reducer: productReducer } = createSlice({
  name: 'productSlice',
  initialState: {
    product: null,
    products: [],
    newProduct: {
      ...initialStateNewProduct,
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
    initialNewProduct(state) {
      return {
        ...state,
        newProduct: {
          ...initialStateNewProduct,
        },
      };
    },
  },
});

export const {
  setProducts,
  setProduct,
  writeNewProduct,
  initialNewProduct,
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

export function postProduct({ files }) {
  return async (dispatch, getState) => {
    const {
      authReducer: {
        user: {
          uid,
        },
      },
      productReducer: {
        newProduct,
      },
    } = getState();

    const productImages = await uploadProductImages({
      uid, files,
    });

    await postProductFireStore({
      ...newProduct,
      productImages,
      creatorId: uid,
      createAt: Date.now(),
    });

    dispatch(initialNewProduct());
  };
}

export default productReducer;
