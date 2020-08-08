const initialState = {
  product: null,
  products: [],
};

const reducers = {
  setProducts(state, { payload: { products } }) {
    return {
      ...state,
      products,
    };
  },
  setProduct(state, { payload: { product } }) {
    return {
      ...state,
      product,
    };
  },
};

function defaultReducer(state) {
  return state;
}

export default function reducer(state = initialState, action) {
  return (reducers[action.type] || defaultReducer)(state, action);
}
