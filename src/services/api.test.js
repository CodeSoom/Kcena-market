import {
  fetchItems,
} from './api';

import mockItems from '../../fixtures/items';

describe('api', () => {
  const mockFetch = (data) => {
    global.fetch = jest.fn().mockResolvedValue({
      async json() { return data; },
    });
  };

  describe('fetchItems', () => {
    beforeEach(() => {
      mockFetch(mockItems);
    });

    it('returns items', async () => {
      const items = await fetchItems();

      expect(items).toEqual(mockItems);
    });
  });
});
