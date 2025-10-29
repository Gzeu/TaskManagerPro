// Mock for @react-native-firebase/auth
const auth = () => ({
  currentUser: null,
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: { uid: 'test-uid' } })),
  createUserWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: { uid: 'test-uid' } })),
  signInWithCredential: jest.fn(() => Promise.resolve({ user: { uid: 'test-uid' } })),
  signOut: jest.fn(() => Promise.resolve()),
  onAuthStateChanged: jest.fn((callback) => {
    callback({ uid: 'test-uid' });
    return () => {}; // Return unsubscribe function
  }),
  sendPasswordResetEmail: jest.fn(() => Promise.resolve()),
  confirmPasswordReset: jest.fn(() => Promise.resolve()),
  verifyPasswordResetCode: jest.fn(() => Promise.resolve('test-email@example.com')),
  signInAnonymously: jest.fn(() => Promise.resolve({ user: { uid: 'test-uid' } })),
  GoogleAuthProvider: {
    credential: jest.fn(() => ({
      providerId: 'google.com',
      token: 'test-token',
      secret: 'test-secret',
    })),
  },
  FacebookAuthProvider: {
    credential: jest.fn(() => ({
      providerId: 'facebook.com',
      token: 'test-token',
    })),
  },
});

auth.GoogleAuthProvider = {
  credential: jest.fn(() => ({
    providerId: 'google.com',
    token: 'test-token',
    secret: 'test-secret',
  })),
};

auth.FacebookAuthProvider = {
  credential: jest.fn(() => ({
    providerId: 'facebook.com',
    token: 'test-token',
  })),
};

module.exports = auth;
