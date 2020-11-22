import { saveItem, loadItem, deleteItem } from './storage';

import { logInUser } from '../../fixtures/user';

describe('localStorage', () => {
  const KEY = 'user';
  const VALUE = logInUser;

  beforeEach(() => {
    localStorage.clear();
  });

  it('save to localStorage', () => {
    saveItem(KEY, VALUE);

    expect(localStorage.setItem)
      .toHaveBeenLastCalledWith(KEY, JSON.stringify(VALUE));
  });

  it('load to localStorage', () => {
    loadItem(KEY);

    expect(localStorage.getItem).toHaveBeenLastCalledWith(KEY);
  });

  it('delete to localStorage', () => {
    deleteItem(KEY);

    expect(localStorage.removeItem).toHaveBeenLastCalledWith(KEY);
  });
});
