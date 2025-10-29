// Mock for react-native-safe-area-context
export const SafeAreaProvider = ({ children }) => children;
export const SafeAreaView = 'SafeAreaView';

export const useSafeAreaInsets = () => ({
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
});

export const useSafeAreaFrame = () => ({
  x: 0,
  y: 0,
  width: 375,
  height: 812,
});

// Default export for backward compatibility
export default {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
  useSafeAreaFrame,
};
