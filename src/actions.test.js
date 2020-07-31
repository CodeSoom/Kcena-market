import thunk from 'redux-thunk';

import configureStore from 'redux-mock-store';

import {
  setItems,
  loadInitItems,
} from './actions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('./services/api');

describe('actions', () => {
  let store;

  describe('loadInitItems', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    it('runs setItems', async () => {
      await store.dispatch(loadInitItems());

      const actions = store.getActions();

      expect(actions[0]).toEqual(setItems([]));
    });
  });
});
