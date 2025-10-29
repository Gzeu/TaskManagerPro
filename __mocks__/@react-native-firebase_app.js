// Mock for @react-native-firebase/app

// Create a mock app instance
const createMockApp = () => ({
  name: '[DEFAULT]',
  options: {},
  // Add any other app methods you use
});

// Create the main firebase mock object
const firebase = {
  // Mock the default Firebase app
  app: jest.fn(createMockApp),
  
  // Mock the initializeApp method
  initializeApp: jest.fn(createMockApp),
  
  // Mock the app instance methods
  apps: [createMockApp()],
  
  // Mock the auth method
  auth: jest.fn(() => ({
    currentUser: null,
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    onAuthStateChanged: jest.fn(),
    // Add any other auth methods you use
  })),
  
  // Mock the firestore method
  firestore: jest.fn(() => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        get: jest.fn(() => Promise.resolve({ exists: true, data: () => ({}) })),
        set: jest.fn(() => Promise.resolve()),
        update: jest.fn(() => Promise.resolve()),
        delete: jest.fn(() => Promise.resolve()),
        onSnapshot: jest.fn(),
      })),
      where: jest.fn(() => ({
        get: jest.fn(() => Promise.resolve({ docs: [] })),
        onSnapshot: jest.fn(),
      })),
      get: jest.fn(() => Promise.resolve({ docs: [] })),
      add: jest.fn(() => Promise.resolve({ id: 'test-id' })),
      onSnapshot: jest.fn(),
    })),
    batch: jest.fn(() => ({
      set: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      commit: jest.fn(() => Promise.resolve()),
    })),
    runTransaction: jest.fn(async (updateFunction) => {
      return await updateFunction({ get: () => ({ data: () => ({}) }) });
    }),
  })),
  
  // Mock the storage method
  storage: jest.fn(() => ({
    ref: jest.fn(() => ({
      putFile: jest.fn(() => Promise.resolve({
        ref: {
          getDownloadURL: jest.fn(() => Promise.resolve('https://example.com/file.png')),
        },
      })),
      getDownloadURL: jest.fn(() => Promise.resolve('https://example.com/file.png')),
      delete: jest.fn(() => Promise.resolve()),
    })),
  })),
  
  // Mock the messaging method
  messaging: jest.fn(() => ({
    hasPermission: jest.fn(() => Promise.resolve(true)),
    requestPermission: jest.fn(() => Promise.resolve(true)),
    getToken: jest.fn(() => Promise.resolve('test-token')),
    onMessage: jest.fn(),
    onNotificationOpenedApp: jest.fn(),
    getInitialNotification: jest.fn(() => Promise.resolve(null)),
  })),
};

// Add static properties
firebase.app.App = jest.fn();
firebase.apps = [firebase.app()];

// Default export for backward compatibility
module.exports = firebase;
