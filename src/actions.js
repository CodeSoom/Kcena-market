import {
  fetchProducts,
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
