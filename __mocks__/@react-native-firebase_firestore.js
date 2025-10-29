// Mock for @react-native-firebase/firestore
const firestore = () => {
  const mockCollection = (collectionPath) => {
    return {
      doc: (docPath) => ({
        get: jest.fn(() => Promise.resolve({ exists: true, data: () => ({ id: docPath }), id: docPath })),
        set: jest.fn(() => Promise.resolve()),
        update: jest.fn(() => Promise.resolve()),
        delete: jest.fn(() => Promise.resolve()),
        collection: mockCollection,
        onSnapshot: jest.fn((onNext, onError) => {
          onNext({ data: () => ({ id: docPath }) });
          return () => {}; // Return unsubscribe function
        }),
      }),
      where: jest.fn(() => ({
        get: jest.fn(() => Promise.resolve({ docs: [] })),
        onSnapshot: jest.fn((onNext, onError) => {
          onNext({ docs: [] });
          return () => {}; // Return unsubscribe function
        }),
      })),
      orderBy: jest.fn(() => ({
        get: jest.fn(() => Promise.resolve({ docs: [] })),
        onSnapshot: jest.fn((onNext, onError) => {
          onNext({ docs: [] });
          return () => {}; // Return unsubscribe function
        }),
      })),
      limit: jest.fn(() => ({
        get: jest.fn(() => Promise.resolve({ docs: [] })),
        onSnapshot: jest.fn((onNext, onError) => {
          onNext({ docs: [] });
          return () => {}; // Return unsubscribe function
        }),
      })),
      get: jest.fn(() => Promise.resolve({ docs: [] })),
      add: jest.fn(() => Promise.resolve({ id: 'test-id' })),
      onSnapshot: jest.fn((onNext, onError) => {
        onNext({ docs: [] });
        return () => {}; // Return unsubscribe function
      }),
    };
  };

  return {
    collection: mockCollection,
    doc: (path) => ({
      get: jest.fn(() => Promise.resolve({ exists: true, data: () => ({ id: path }), id: path })),
      set: jest.fn(() => Promise.resolve()),
      update: jest.fn(() => Promise.resolve()),
      delete: jest.fn(() => Promise.resolve()),
      onSnapshot: jest.fn((onNext, onError) => {
        onNext({ exists: true, data: () => ({ id: path }) });
        return () => {}; // Return unsubscribe function
      }),
    }),
    batch: () => ({
      set: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      commit: jest.fn(() => Promise.resolve()),
    }),
    runTransaction: jest.fn(async (updateFunction) => {
      return await updateFunction({ get: () => ({ data: () => ({}) }) });
    }),
    FieldValue: {
      serverTimestamp: () => new Date().toISOString(),
      delete: () => 'FIELD_DELETE',
      arrayUnion: (...elements) => ({ type: 'ARRAY_UNION', elements }),
      arrayRemove: (...elements) => ({ type: 'ARRAY_REMOVE', elements }),
      increment: (n) => ({ type: 'INCREMENT', value: n }),
    },
    Timestamp: {
      fromDate: (date) => ({ toDate: () => date }),
      now: () => ({ toDate: () => new Date() }),
    },
  };
};

// Add static properties
firestore.FieldPath = {
  documentId: () => 'id',
};

firestore.FieldValue = {
  serverTimestamp: () => 'SERVER_TIMESTAMP',
  delete: () => 'FIELD_DELETE',
  arrayUnion: (...elements) => ({ type: 'ARRAY_UNION', elements }),
  arrayRemove: (...elements) => ({ type: 'ARRAY_REMOVE', elements }),
  increment: (n) => ({ type: 'INCREMENT', value: n }),
};

firestore.Timestamp = {
  fromDate: (date) => ({ toDate: () => date }),
  now: () => ({ toDate: () => new Date() }),
};

module.exports = firestore;
