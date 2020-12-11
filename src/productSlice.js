import { createSlice } from '@reduxjs/toolkit';

import {
  fetchProducts,
  fetchProduct,
  postProductFireStore,
  editProductFireStore,
  fetchloggedInUserSellProducts,
  deleteProductFireStore,
  deleteAllImageInStorage,
  uploadProductImages,
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

export function postProduct({ files, newProduct }) {
  return async (_, getState) => {
    const {
      authReducer: {
        user,
      },
    } = getState();

    const createAt = Date.now();
    const urls = await uploadProductImages({ files });
    const productImages = files.map((file, index) => ({
      name: file.name,
      imageUrl: urls[index],
    }));

    await postProductFireStore({
      ...newProduct,
      productImages,
      user,
      createAt,
    });
  };
}

export function editProduct({
  files, toBeDeletedUrls, productId, newProduct,
}) {
  return async (_, getState) => {
    const {
      productReducer: {
        product,
      },
    } = getState();

    const createAt = Date.now();
    const urls = await uploadProductImages({ files });
    const addedProductImages = files.map((file, index) => ({
      name: file.name,
      imageUrl: urls[index],
    }));

    const editedProduct = {
      ...newProduct,
      productImages: [
        ...product.productImages,
        ...addedProductImages,
      ],
      createAt,
    };

    console.log(toBeDeletedUrls);
    await editProductFireStore({ productId, editedProduct });
    await deleteAllImageInStorage(toBeDeletedUrls);
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
