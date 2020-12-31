export const push = jest.fn((pathname) => ({
  type: 'LOCATION_CHANGE',
  payload: {
    location: {
      pathname,
    },
    action: 'PUSH',
  },
}));

export const xxx = jest.fn();
