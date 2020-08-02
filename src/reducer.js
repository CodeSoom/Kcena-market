const initialState = {
  products: [],
};

const reducers = {
  setProducts(state, { payload: { products } }) {
    return {
      ...state,
      products,
    };
  },
};

function defaultReducer(state) {
  return state;
}

export default function reducer(state = initialState, action) {
  return (reducers[action.type] || defaultReducer)(state, action);
}
