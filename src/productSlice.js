import { createSlice } from '@reduxjs/toolkit';

import {
  fetchProducts,
  fetchProduct,
  postProductFireStore,
  uploadProductImages,
  fetchMyProducts,
  deleteProductFireStore,
} from './services/api';

const { actions, reducer: productReducer } = createSlice({
  name: 'productSlice',
  initialState: {
    product: null,
    products: [],
    userProducts: [],
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
    setMyProducts(state, { payload: myProducts }) {
      return {
        ...state,
        myProducts,
      };
    },
  },
});

export const {
  setProducts,
  setProduct,
  setMyProducts,
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

export function loadMyProducts({ user }) {
  return async (dispatch) => {
    const myProducts = await fetchMyProducts({ user });
    dispatch(setMyProducts(myProducts));
  };
}

export function postProduct({ files, newProduct }) {
  return async (_, getState) => {
    const {
      authReducer: {
        user,
      },
    } = getState();

    const productImages = await uploadProductImages({
      uid: user.uid, files,
    });

    await postProductFireStore({
      ...newProduct,
      productImages,
      user,
      createAt: Date.now(),
    });
  };
}

export function deleteProduct({ product }) {
  return async (dispatch, getState) => {
    const {
      productReducer: {
        myProducts,
      },
    } = getState();

    await deleteProductFireStore({ product });
    dispatch(setMyProducts(
      myProducts.filter(
        (myProduct) => myProduct.id !== product.id,
      ),
    ));
  };
}

export default productReducer;
