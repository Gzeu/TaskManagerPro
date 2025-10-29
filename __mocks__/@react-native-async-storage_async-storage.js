// Mock for @react-native-async-storage/async-storage
const mockAsyncStorage = (() => {
  let store = {};

  return {
    getItem: jest.fn((key) => {
      return Promise.resolve(store[key] || null);
    }),
    
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
      return Promise.resolve(null);
    }),
    
    removeItem: jest.fn((key) => {
      delete store[key];
      return Promise.resolve();
    }),
    
    clear: jest.fn(() => {
      store = {};
      return Promise.resolve();
    }),
    
    getAllKeys: jest.fn(() => {
      return Promise.resolve(Object.keys(store));
    }),
    
    multiGet: jest.fn((keys) => {
      const results = keys.map(key => [key, store[key] || null]);
      return Promise.resolve(results);
    }),
    
    multiSet: jest.fn((keyValuePairs) => {
      keyValuePairs.forEach(([key, value]) => {
        store[key] = value;
      });
      return Promise.resolve(null);
    }),
    
    multiRemove: jest.fn((keys) => {
      keys.forEach(key => {
        delete store[key];
      });
      return Promise.resolve();
    }),
    
    multiMerge: jest.fn((keyValuePairs) => {
      keyValuePairs.forEach(([key, value]) => {
        const existing = store[key] ? JSON.parse(store[key]) : {};
        const newValue = JSON.parse(value);
        store[key] = JSON.stringify({ ...existing, ...newValue });
      });
      return Promise.resolve();
    }),
    
    // For testing purposes
    _clearStore: () => {
      store = {};
    },
    
    _getStore: () => {
      return { ...store };
    }
  };
})();

// Mock the default export
module.exports = mockAsyncStorage;
