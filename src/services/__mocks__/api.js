export async function fetchProducts() {
  return [];
}

export async function fetchProduct() {
  return {};
}

export async function fetchUserProducts() {
  return [];
}

export const postLogin = jest.fn();

export const postGoogleSignIn = jest.fn();

export const postSignup = jest.fn();

export const postProductFireStore = jest.fn();

export const postLogout = jest.fn();

export const uploadProductImages = jest.fn(() => []);

export const editProductFireStore = jest.fn();

export const deleteProductFireStore = jest.fn();

export const deleteImageInStorage = jest.fn();

export const deleteAllImageInStorage = jest.fn();
