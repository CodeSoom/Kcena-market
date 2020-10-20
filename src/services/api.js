import { v4 as uuidv4 } from 'uuid';
import firebase from '../../plugin/firebase';

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

export async function postProductFireStore(newProduct) {
  const response = await firebase
    .firestore().collection('products').add(newProduct);

  return response;
}

export async function uploadProductImages({ uid, files }) {
  const promises = files.map(async (file) => {
    const uploadTask = firebase.storage()
      .ref().child(`${uid}/${uuidv4()}`);
    const response = await uploadTask.put(file);
    const imageUrl = await response.ref.getDownloadURL();
    return imageUrl;
  });

  const imagesUrl = await Promise.all(promises);
  return imagesUrl;
}

export async function postLogin({ email, password }) {
  const response = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);

  return response;
}

export async function postGoogleSignIn() {
  const response = await firebase
    .auth()
    .signInWithPopup(
      new firebase.auth.GoogleAuthProvider(),
    );

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
