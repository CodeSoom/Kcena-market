const initialState = {
  items: [],
};

const reducers = {
  setItems(state, { payload: { items } }) {
    return {
      ...state,
      items,
    };
  },
};

function defaultReducer(state) {
  return state;
}

export default function reducer(state = initialState, action) {
  return (reducers[action.type] || defaultReducer)(state, action);
}
