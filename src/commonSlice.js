import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pendingConfirmation: {
    isOpen: false,
    title: '',
    content: '',
  },
};

const { actions, reducer: commonReducer } = createSlice({
  name: 'commonSlice',
  initialState,
  reducers: {
    createConfirm(state, {
      payload: {
        isOpen, title, content,
      },
    }) {
      return {
        ...state,
        pendingConfirmation: {
          isOpen,
          title,
          content,
        },
      };
    },
    cancelConfirm() {
      return initialState;
    },
  },
});

export const {
  createConfirm,
  cancelConfirm,
} = actions;

export function confirmPendingAction(pendingConfirmAction = null) {
  return (dispatch) => {
    if (pendingConfirmAction) {
      dispatch(pendingConfirmAction);
      dispatch(cancelConfirm());
    } else {
      dispatch(cancelConfirm());
    }
  };
}

export default commonReducer;
