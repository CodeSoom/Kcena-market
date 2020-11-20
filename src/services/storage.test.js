import { saveItem, loadItem, deleteItem } from './storage';

describe('localStorage', () => {
  const KEY = 'user';
  const VALUE = {
    email: 'tester@example.com',
    displayName: 'tester',
    uid: '123456',
  };

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
