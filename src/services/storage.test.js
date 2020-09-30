import { saveItem, loadItem } from './storage';

describe('localStorage', () => {
  const KEY = 'user';
  const VALUE = {
    displayName: 'tester',
    uid: '123456',
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('save to localStorage', () => {
    saveItem(KEY, VALUE);

    expect(localStorage.setItem).toHaveBeenLastCalledWith(KEY, VALUE);
  });

  it('load to localStorage', () => {
    loadItem(KEY);

    expect(localStorage.getItem).toHaveBeenLastCalledWith(KEY);
  });
});
