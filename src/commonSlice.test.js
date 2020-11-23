import configureStore from 'redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

import commonReducer, {
  createConfirm,
  cancelConfirm,
  confirmPendingAction,
} from './commonSlice';

const middlewares = [...getDefaultMiddleware()];
const mockStore = configureStore(middlewares);

const initialState = {
  pendingConfirmation: {
    isOpen: false,
    title: '',
    content: '',
  },
};
const openConfirmationDialog = {
  pendingConfirmation: {
    isOpen: true,
    title: '상품을 삭제하시겠습니까?',
    content: '삭제하면 되돌릴 수 없습니다.',
  },
};

const cancelConfirmationDialog = initialState;

describe('reducer', () => {
  context('when previous state is undefined', () => {
    it('returns initialState', () => {
      const state = commonReducer(undefined, { type: 'action' });

      expect(state).toEqual(initialState);
    });
  });

  describe('createConfirm', () => {
    it('set confirmation message', () => {
      const openPendingConfirmationState = openConfirmationDialog.pendingConfirmation;

      const state = commonReducer(initialState, createConfirm(openPendingConfirmationState));

      const {
        pendingConfirmation: {
          isOpen, title, content,
        },
      } = state;

      expect(isOpen).toBe(true);
      expect(title).toBe('상품을 삭제하시겠습니까?');
      expect(content).toBe('삭제하면 되돌릴 수 없습니다.');
    });
  });

  describe('cancelConfirm', () => {
    it('set initial state', () => {
      const state = commonReducer(openConfirmationDialog, cancelConfirm());

      expect(state).toEqual(cancelConfirmationDialog);
    });
  });
});

describe('actions', () => {
  let store;

  describe('confirmPendingAction', () => {
    beforeEach(() => {
      store = mockStore({
        pendingConfirmation: {
          isOpen: true,
          title: 'test title',
          content: 'test content',
        },
      });
    });

    context('with pendingConfirmAction', () => {
      it('dispatchs pending confirm action and cancel', () => {
        const mockConfirmAction = jest.fn();
        store.dispatch(confirmPendingAction(mockConfirmAction));

        const actions = store.getActions();

        expect(actions[0].type).toBe('commonSlice/cancelConfirm');
      });
    });

    context('without pendingConfirmAction', () => {
      it('dispatchs cancel', () => {
        store.dispatch(confirmPendingAction());

        const actions = store.getActions();

        expect(actions[0].type).toBe('commonSlice/cancelConfirm');
      });
    });
  });
});
