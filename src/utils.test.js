import { get, equal, isEmpty } from './utils';

test('get', () => {
  const state = {
    name: '홍길동',
  };

  const f = get('name');
  const g = get('age');

  expect(f(state)).toBe('홍길동');
  expect(g(state)).toBeUndefined();
});

test('equal', () => {
  const state = {
    name: '홍길동',
  };

  const f = equal('name', '홍길동');
  const g = equal('name', '임꺽정');

  expect(f(state)).toBeTruthy();
  expect(g(state)).toBeFalsy();
});

describe('isEmpty', () => {
  context('with empty array', () => {
    it('returns true', () => {
      expect(isEmpty([])).toBe(true);
    });
  });

  context('with not empty array', () => {
    it('returns false', () => {
      expect(isEmpty([1, 2, 3])).toBe(false);
    });
  });
});
