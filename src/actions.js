import {
  fetchItems,
} from './services/api';

export function setItems(items) {
  return {
    type: 'setItems',
    payload: { items },
  };
}

export function loadInitItems() {
  return async (dispatch) => {
    const items = await fetchItems();
    dispatch(setItems(items));
  };
}
