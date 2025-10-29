import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

// Mock the main app component to avoid loading the entire app
describe('App', () => {
  it('renders without crashing', () => {
    // Mock the AsyncStorage module
    jest.mock('@react-native-async-storage/async-storage', () => ({
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    }));

    // Just check if the app renders without throwing
    const { toJSON } = render(<App />);
    expect(toJSON).toBeTruthy();
  });
});
