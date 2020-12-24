import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer: commonReducer } = createSlice({
  name: 'commonSlice',
  initialState: {
    isLoading: false,
  },
  reducers: {
    setIsLoading(state, { payload: isLoading }) {
      return {
        ...state,
        isLoading,
      };
    },
  },
});

export const {
  setIsLoading,
} = actions;

export default commonReducer;
