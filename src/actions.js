import {
  fetchProducts,
  fetchProduct,
} from './services/api';

export function setProducts(products) {
  return {
    type: 'setProducts',
    payload: { products },
  };
}

export function loadInitProducts() {
  return async (dispatch) => {
    const products = await fetchProducts();
    dispatch(setProducts(products));
  };
}

export function setProduct(product) {
  return {
    type: 'setProduct',
    payload: { product },
  };
}

export function loadProduct({ productId }) {
  return async (dispatch) => {
    const product = await fetchProduct(productId);
    dispatch(setProduct(product));
  };
}
