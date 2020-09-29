import { createSlice } from '@reduxjs/toolkit';

import {
  fetchProducts,
  fetchProduct,
  postLogin,
  postGoogleSignIn,
  postSignup,
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
    signupFields: {
      email: '',
      password: '',
    },
    user: {
      ...initialUser,
    },
    error: '',
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
    changeSignupField(state, { payload: { name, value } }) {
      return {
        ...state,
        signupFields: {
          ...state.signupFields,
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
    setError(state, { payload: error }) {
      return {
        ...state,
        error,
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
  changeSignupField,
  setUser,
  setError,
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
      dispatch(setError(error.message));
    }
  };
}

export function requestGoogleSignIn() {
  return async (dispatch) => {
    try {
      const {
        user: {
          displayName, uid,
        },
      } = await postGoogleSignIn();

      dispatch(setUser({ displayName, uid }));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
}

export function requestSignup() {
  return async (dispatch, getState) => {
    const { signupFields: { email, password } } = getState();
    try {
      const {
        user: {
          displayName, uid,
        },
      } = await postSignup({ email, password });
      dispatch(setUser({ displayName, uid }));
    } catch (error) {
      dispatch(setError(error.message));
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
