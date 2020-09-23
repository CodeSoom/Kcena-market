import { createSlice } from '@reduxjs/toolkit';

import {
  fetchProducts,
  fetchProduct,
  postLogin,
  postLogout,
} from './services/api';

const initialUser = {
  displayName: '',
  uid: '',
};

const { actions, reducer } = createSlice({
  name: 'application',
  initialState: {
    product: null,
    products: [],
    loginFields: {
      email: '',
      password: '',
    },
    user: {
      ...initialUser,
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
    changeLoginField(state, { payload: { name, value } }) {
      return {
        ...state,
        loginFields: {
          ...state.loginFields,
          [name]: value,
        },
      };
    },
    setUser(state, { payload: { displayName, uid } }) {
      return {
        ...state,
        user: {
          displayName,
          uid,
        },
      };
    },
    logout(state) {
      return {
        ...state,
        user: {
          ...initialUser,
        },
      };
    },
  },
});

export const {
  setProducts,
  setProduct,
  changeLoginField,
  setUser,
  logout,
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

export function requestLogin() {
  return async (dispatch, getState) => {
    const { loginFields: { email, password } } = getState();
    try {
      const {
        user: {
          displayName, uid,
        },
      } = await postLogin({ email, password });

      dispatch(setUser({ displayName, uid }));
    } catch (error) {
      // TODO: setError
    }
  };
}

export function requestLogout() {
  return async (dispatch) => {
    await postLogout();
    dispatch(logout());
  };
}

export default reducer;
