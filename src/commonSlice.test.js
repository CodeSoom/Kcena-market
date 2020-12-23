import commonReducer, {
  setIsLoading,
} from './commonSlice';

describe('common reducer', () => {
  context('show loading', () => {
    it('isLoading is true', () => {
      const initialState = {
        isLoading: false,
      };
      const state = commonReducer(initialState, setIsLoading(true));
      expect(state.isLoading).toBe(true);
    });
  });

  context('hide loading', () => {
    it('isLoading is false', () => {
      const initialState = {
        isLoading: true,
      };
      const state = commonReducer(initialState, setIsLoading(false));
      expect(state.isLoading).toBe(false);
    });
  });
});
