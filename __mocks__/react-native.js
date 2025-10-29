// Minimal React Native mock
export const View = 'View';
export const Text = 'Text';
export const Image = 'Image';
export const StyleSheet = {
  create: (styles) => styles,
};

export const Platform = {
  OS: 'ios',
  select: (obj) => obj.ios || obj.default,
};

export const NativeModules = {
  RNGestureHandlerModule: {
    attachGestureHandler: jest.fn(),
    createGestureHandler: jest.fn(),
    dropGestureHandler: jest.fn(),
    updateGestureHandler: jest.fn(),
    Direction: { RIGHT: 1, LEFT: 2, UP: 4, DOWN: 8 },
    State: { BEGAN: 'BEGAN', FAILED: 'FAILED', ACTIVE: 'ACTIVE', END: 'END' },
  },
};

export const Animated = {
  View: 'Animated.View',
  timing: () => ({
    start: (callback) => callback && callback(),
  }),
};

// Default export for backward compatibility
export default {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  NativeModules,
  Animated,
};
