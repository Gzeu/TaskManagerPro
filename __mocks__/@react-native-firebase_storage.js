// Mock for @react-native-firebase/storage
const storage = () => ({
  ref: jest.fn(() => ({
    putFile: jest.fn(() => Promise.resolve()),
    getDownloadURL: jest.fn(() => Promise.resolve('https://example.com/file.png')),
    delete: jest.fn(() => Promise.resolve()),
  })),
  // Add any other storage methods you use
});

// Add static properties if needed
storage.TaskState = {
  STATE_CANCELED: 'canceled',
  STATE_ERROR: 'error',
  STATE_PAUSED: 'paused',
  STATE_RUNNING: 'running',
  STATE_SUCCESS: 'success',
};

module.exports = storage;
