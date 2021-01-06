import products from '../../../fixtures/products';

const collections = {
  products,
};

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
      where: jest.fn().mockImplementation((fieldName, operator, value) => {
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
    refFromURL: jest.fn().mockImplementation((url) => ({
      delete: jest.fn(),
    })),
  })),
};

export default firebase;
