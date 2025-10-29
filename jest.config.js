module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|@react-navigation|@react-native-firebase|@react-native-async-storage|@react-native-community|@reduxjs/toolkit|react-redux)/)',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/types/**/*',
    '!**/node_modules/**',
    '!**/__mocks__/**',
    '!**/__tests__/**',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@screens/(.*)$': '<rootDir>/src/screens/$1',
    '^@navigation/(.*)$': '<rootDir>/src/navigation/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
  setupFiles: [
    './node_modules/react-native-gesture-handler/jestSetup.js',
    './__mocks__/react-native-reanimated.js',
    './__mocks__/react-native.js',
    './__mocks__/react-native-paper.js',
    './__mocks__/react-native-safe-area-context.js',
    './__mocks__/react-native-gesture-handler.js',
    './__mocks__/@react-native-firebase_app.js',
    './__mocks__/@react-native-firebase_auth.js',
    './__mocks__/@react-native-firebase_firestore.js',
    './__mocks__/@react-native-firebase_storage.js',
    './__mocks__/@react-native-async-storage_async-storage.js',
  ],
  testEnvironment: 'node',
  globals: {
    __DEV__: true,
  },
  cacheDirectory: '.jest/cache',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  // Mock modules that cause issues in tests
  modulePathIgnorePatterns: [
    'node_modules/(?!(jest-)?@react-native|@react-navigation|@react-native-community|@react-native-firebase|@react-native-async-storage)',
  ],
};
