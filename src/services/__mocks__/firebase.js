import products from '../../../fixtures/products';
import { logInUser } from '../../../fixtures/user';

const collections = {
  products,
};

const googleAuthLogin = jest.fn().mockImplementation(() => ({
  user: logInUser,
}));

const firebase = {
  auth: jest.fn(() => ({
    signInWithEmailAndPassword: jest.fn((email, password) => ({
      user: {
        displayName: undefined, email, password,
      },
    })),
    createUserWithEmailAndPassword: jest.fn((email, password) => ({
      user: {
        displayName: undefined, email, password,
      },
    })),
    signOut: jest.fn(),
  })),
  firestore: jest.fn(() => ({
    collection: jest.fn().mockImplementation((path) => ({
      get: jest.fn().mockResolvedValue({
        docs: collections[path].map((item) => ({
          id: item.id,
          data: () => item,
        })),
      }),
      doc: jest.fn().mockImplementation((docId) => ({
        get: jest.fn().mockResolvedValue({
          data: () => products.find(({ id }) => id === docId),
        }),
        update: jest.fn(),
        delete: jest.fn(),
      })),
      add: jest.fn().mockImplementation((item) => item),
      where: jest.fn().mockImplementation((_, operator, value) => {
        let result = null;

        if (operator === '==') {
          result = ({
            get: jest.fn().mockResolvedValue({
              docs: collections[path]
                .filter((doc) => doc.user.uid === value)
                .map((doc) => ({
                  id: doc.uid,
                  data: () => doc,
                })),
            }),
          });
        }
        return result;
      }),
    })),
  })),
  storage: jest.fn().mockImplementation(() => ({
    refFromURL: jest.fn().mockImplementation(() => ({
      delete: jest.fn(),
    })),
    ref: jest.fn(() => ({
      child: jest.fn(() => ({
        put: jest.fn(),
        getDownloadURL: jest.fn(() => 'MOCK_IMAGE_URL'),
      })),
    })),
  })),
};

export default firebase;
export { googleAuthLogin };
