import {
  fetchProducts,
  fetchProduct,
} from './api';

import mockProducts from '../../fixtures/products';

describe('api', () => {
  const mockFetch = (data) => {
    global.fetch = jest.fn().mockResolvedValue({
      async json() { return data; },
    });
  };

  describe('fetchProducts', () => {
    beforeEach(() => {
      mockFetch(mockProducts);
    });

    it('returns products', async () => {
      const products = await fetchProducts();

      expect(products).toEqual(mockProducts);
    });
  });

  describe('fetchProduct', () => {
    beforeEach(() => {
      mockFetch(mockProducts[0]);
    });

    it('returns product', async () => {
      const product = await fetchProduct();

      expect(product).toEqual(mockProducts[0]);
    });
  });
});
