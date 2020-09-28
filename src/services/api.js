import firebase from '../../plugin/firebase';

export async function fetchProducts() {
  const url = 'http://localhost:3001/products';
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function fetchProduct(productId) {
  const url = `http://localhost:3001/products/${productId}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function postLogin({ email, password }) {
  const response = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);
  return response;
}

export async function postSignup({ email, password }) {
  const response = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
  return response;
}

export async function postLogout() {
  const response = await firebase
    .auth()
    .signOut();
  return response;
}
