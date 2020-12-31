import { createSlice } from '@reduxjs/toolkit';

import { push } from 'connected-react-router';

import {
  fetchProducts,
  fetchProduct,
  postProduct,
  postEditProduct,
  fetchUserProducts,
  postDeleteProduct,
  deleteAllImages,
  uploadProductImages,
} from './services/api';

import { setIsLoading } from './commonSlice';

const initialProduct = {
  title: '',
  description: '',
  category: '',
  region: '',
  price: '',
  productImages: [],
  user: {},
  createAt: '',
};

const { actions, reducer: productReducer } = createSlice({
  name: 'productSlice',
  initialState: {
    product: initialProduct,
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
    deleteProductImage(state, { payload: selectedImageUrl }) {
      return {
        ...state,
        product: {
          ...state.product,
          productImages: state.product.productImages
            .filter(({ imageUrl }) => imageUrl !== selectedImageUrl),
        },
      };
    },
    setInitialProduct(state) {
      return {
        ...state,
        product: initialProduct,
      };
    },
    setUserProducts(state, { payload: userProducts }) {
      return {
        ...state,
        userProducts,
      };
    },
  },
});

export const {
  setProducts,
  setProduct,
  deleteProductImage,
  setInitialProduct,
  setUserProducts,
} = actions;

export function loadInitProducts() {
  return async (dispatch) => {
    dispatch(setIsLoading(true));
    const products = await fetchProducts();
    dispatch(setProducts(products));
    dispatch(setIsLoading(false));
  };
}

export function loadProduct({ productId }) {
  return async (dispatch) => {
    const product = await fetchProduct(productId);
    dispatch(setProduct(product));
  };
}

export function loadUserProducts({ user }) {
  return async (dispatch) => {
    dispatch(setIsLoading(true));
    const userProducts = await fetchUserProducts({ user });
    dispatch(setUserProducts(userProducts));
    dispatch(setIsLoading(false));
  };
}

export function createPost({ files, product }) {
  return async (dispatch, getState) => {
    const {
      authReducer: {
        user,
      },
    } = getState();

    dispatch(setIsLoading(true));
    const productImages = await uploadProductImages({ files });
    const productId = await postProduct({
      ...product,
      productImages,
      user,
      createAt: Date.now(),
    });
    dispatch(setIsLoading(false));
    dispatch(push(`/products/${productId}`));
  };
}

export function editPost({
  files, toBeDeletedUrls, productId, newProduct,
}) {
  return async (dispatch, getState) => {
    const {
      productReducer: {
        product,
      },
    } = getState();

    dispatch(setIsLoading(true));
    const newProductImages = await uploadProductImages({ files });
    const editedProduct = {
      ...newProduct,
      productImages: [
        ...product.productImages,
        ...newProductImages,
      ],
      createAt: Date.now(),
    };
    await postEditProduct({ productId, editedProduct });
    await deleteAllImages(toBeDeletedUrls);
    dispatch(setIsLoading(false));
    dispatch(push(`/products/${productId}`));
  };
}

export function deletePost({ product }) {
  return async (dispatch, getState) => {
    const {
      productReducer: {
        userProducts,
      },
    } = getState();

    await postDeleteProduct({ product });
    dispatch(setUserProducts(
      userProducts.filter(
        (myProduct) => myProduct.id !== product.id,
      ),
    ));
  };
}

export default productReducer;
