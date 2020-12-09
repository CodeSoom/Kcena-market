import { createSlice } from '@reduxjs/toolkit';

import {
  fetchProducts,
  fetchProduct,
  postProductFireStore,
  fetchloggedInUserSellProducts,
  deleteProductFireStore,
  deleteImageInStorage,
  deleteAllImageInStorage,
} from './services/api';

import { isEmpty } from './utils';

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
    addProductImages(state, { payload: productImages }) {
      return {
        ...state,
        product: {
          ...state.product,
          productImages: [
            ...state.product.productImages,
            ...productImages,
          ],
        },
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
    setloggedInUserSellProducts(state, { payload: loggedInUserSellProducts }) {
      return {
        ...state,
        loggedInUserSellProducts,
      };
    },
  },
});

export const {
  setProducts,
  setProduct,
  setInitialProduct,
  addProductImages,
  deleteProductImage,
  setloggedInUserSellProducts,
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

export function loadLoggedInUserSellProducts({ user }) {
  return async (dispatch) => {
    const loggedInUserSellProducts = await fetchloggedInUserSellProducts({ user });
    dispatch(setloggedInUserSellProducts(loggedInUserSellProducts));
  };
}

export function postProduct({ newProduct }) {
  return async (_, getState) => {
    const {
      authReducer: {
        user,
      },
      productReducer: {
        product: { productImages },
      },
    } = getState();

    const createAt = Date.now();

    await postProductFireStore({
      ...newProduct,
      productImages,
      user,
      createAt,
    });
  };
}

export function deleteProduct({ product }) {
  return async (dispatch, getState) => {
    const {
      productReducer: {
        loggedInUserSellProducts,
      },
    } = getState();

    await deleteProductFireStore({ product });
    dispatch(setloggedInUserSellProducts(
      loggedInUserSellProducts.filter(
        (myProduct) => myProduct.id !== product.id,
      ),
    ));
  };
}

export function deleteImage({ imageUrl }) {
  return async (dispatch) => {
    await deleteImageInStorage({ imageUrl });
    dispatch(deleteProductImage(imageUrl));
  };
}

export function deleteAllImageInDropzone() {
  return async (dispatch, getState) => {
    const {
      productReducer: {
        product: { productImages },
      },
    } = getState();

    if (isEmpty(productImages)) {
      return;
    }
    await deleteAllImageInStorage(productImages);
    dispatch(setInitialProduct());
  };
}

export default productReducer;
