import { v4 as uuidv4 } from 'uuid';
import firebase from './firebase';
import { isEmpty } from '../utils';

export async function fetchProducts() {
  const response = await firebase
    .firestore()
    .collection('products').get();

  const products = response.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return products;
}

export async function fetchProduct(productId) {
  const response = await firebase
    .firestore()
    .collection('products').doc(productId).get();

  const product = response.data();

  return product;
}

export async function fetchUserProducts({ user }) {
  const { uid } = user;
  const response = await firebase
    .firestore()
    .collection('products')
    .where('user.uid', '==', uid)
    .get();

  const userProducts = response.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return userProducts;
}

export async function uploadProductImages({ files }) {
  async function uploadProductImage(file) {
    const uploadTask = firebase.storage()
      .ref().child(`${file.name}${uuidv4()}`);
    const response = await uploadTask.put(file);
    const imageUrl = await response.ref.getDownloadURL();
    return imageUrl;
  }

  const uploadTasks = files.map(uploadProductImage);
  const imageUrls = await Promise.all(uploadTasks);

  const productImages = files.map((file, index) => ({
    name: file.name,
    imageUrl: imageUrls[index],
  }));

  return productImages;
}

export async function postProduct(product) {
  const response = await firebase
    .firestore().collection('products').add(product);

  return response.id;
}

export async function postEditProduct({ productId, editedProduct }) {
  await firebase
    .firestore().collection('products').doc(productId).update({
      ...editedProduct,
    });
}

export async function deleteImage(imageUrl) {
  await firebase.storage().refFromURL(imageUrl).delete();
}

export async function deleteAllImages(productImages) {
  const promises = productImages.map(deleteImage);
  await Promise.all(promises);
}

export async function postDeleteProduct({ product }) {
  const { id, productImages } = product;
  await firebase
    .firestore().collection('products').doc(id).delete();

  if (isEmpty(productImages || [])) {
    return;
  }

  const deleteUrls = productImages.map(({ imageUrl }) => imageUrl);
  await deleteAllImages(deleteUrls);
}

export async function postLogin({ email, password }) {
  const { user } = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);

  return user;
}

export async function postGoogleSignIn() {
  const provider = new firebase.auth.GoogleAuthProvider();
  const response = await firebase.auth().signInWithPopup(provider);

  return response;
}

export async function postSignup({ email, password }) {
  const { user } = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);

  return user;
}

export async function postLogout() {
  await firebase.auth().signOut();
}
