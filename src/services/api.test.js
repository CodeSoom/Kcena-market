import {
  fetchProduct,
  fetchProducts,
  fetchUserProducts,
  postProduct,
  postDeleteProduct,
  postEditProduct,
  deleteAllImages,
  postLogin,
  postSignup,
  postLogout,
  uploadProductImages,
  postGoogleSignIn,
} from './api';

import products, { userProducts } from '../../fixtures/products';
import product from '../../fixtures/product';
import { logInUser } from '../../fixtures/user';

jest.mock('./firebase.js');

describe('api', () => {
  describe('fetchProducts', () => {
    it('returns products', async () => {
      const data = await fetchProducts();

      expect(data).toEqual(products);
    });
  });

  describe('fetchProduct', () => {
    it('returns product', async () => {
      const productId = 1;

      const data = await fetchProduct(productId);

      expect(data).toEqual(
        products.find(({ id }) => id === productId),
      );
    });
  });

  describe('fetchUserProducts', () => {
    it('returns userProducts', async () => {
      const user = logInUser;

      const data = await fetchUserProducts({ user });

      expect(data).toEqual(userProducts);
    });
  });

  describe('postProduct', () => {
    it('return post id', async () => {
      const data = await postProduct(product);

      expect(data).toEqual(product.id);
    });
  });

  describe('uploadProductImages', () => {
    it('returns productImages', async () => {
      const files = [
        new File(['file'], 'productImage1.png', {
          type: 'application/json',
        }),
        new File(['file'], 'productImage2.png', {
          type: 'application/json',
        }),
        new File(['file'], 'productImage3.png', {
          type: 'application/json',
        }),
      ];

      const data = await uploadProductImages({ files });

      const productImages = files.map((file) => ({
        name: file.name,
        imageUrl: 'MOCK_IMAGE_URL',
      }));

      expect(data).toEqual(productImages);
    });
  });

  describe('postEditProduct', () => {
    it('request product post edit', async () => {
      const productId = 1;
      const editedProduct = {
        ...product,
        title: '가전제품 팜',
        price: 400000,
      };

      await postEditProduct({ productId, editedProduct });
    });
  });

  describe('postDeleteProduct', () => {
    context('productImages is not empty', () => {
      it('request delete all images and product post delete', async () => {
        const { productImages } = product;

        await postDeleteProduct({ product });

        const deleteUrls = productImages.map(({ imageUrl }) => imageUrl);

        await deleteAllImages(deleteUrls);
      });
    });

    context('productImages is empty', () => {
      it('request only post delete', async () => {
        const emptyImagesInPost = {
          ...product,
          productImages: [],
        };

        await postDeleteProduct({ product: emptyImagesInPost });
      });
    });
  });

  describe('postLogin', () => {
    it('returns user', async () => {
      const email = 'ghdrlfehd@test.com';
      const password = '123456';

      const data = await postLogin({ email, password });

      expect(data).toEqual({
        displayName: undefined,
        email,
        password,
      });
    });
  });

  describe('postGoogleSignin', () => {
    it('returns user', async () => {
      const data = await postGoogleSignIn();

      expect(data).toEqual(logInUser);
    });
  });

  describe('postSignup', () => {
    it('returns sign up user', async () => {
      const email = 'ghdrlfehd@test.com';
      const password = '123456';

      const data = await postSignup({ email, password });

      expect(data).toEqual({
        displayName: undefined,
        email,
        password,
      });
    });
  });

  describe('postLogout', () => {
    it('request logout', async () => {
      await postLogout();
    });
  });
});
