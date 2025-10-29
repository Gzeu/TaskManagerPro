// Minimal react-native-reanimated mock
export const Animated = {
  View: 'Animated.View',
  Text: 'Animated.Text',
  Image: 'Animated.Image',
  ScrollView: 'Animated.ScrollView',
  Code: 'Animated.Code',
};

export const Easing = {
  linear: () => 'easing-linear',
  inOut: () => 'easing-in-out',
  out: () => 'easing-out',
  in: () => 'easing-in',
};

export const withSpring = (value, config) => value;
export const withTiming = (value, config) => value;
export const withDelay = (delay, animation) => animation;
export const withSequence = (...animations) => animations[0];
export const withRepeat = (animation, numberOfReps, reverse = false) => animation;
export const cancelAnimation = () => {};

export const useAnimatedStyle = (style) => style;
export const useAnimatedScrollHandler = () => ({});
export const useAnimatedRef = () => ({ current: null });
export const useAnimatedGestureHandler = (handlers) => handlers;

export const interpolate = (value, inputRange, outputRange, extrapolate) => {
  return outputRange[0];
};

export const useSharedValue = (initialValue) => ({
  value: initialValue,
});

export const createAnimatedComponent = (Component) => Component;

// Default export for backward compatibility
export default {
  ...Animated,
  Easing,
  withSpring,
  withTiming,
  withDelay,
  withSequence,
  withRepeat,
  cancelAnimation,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  useAnimatedRef,
  useAnimatedGestureHandler,
  interpolate,
  useSharedValue,
  createAnimatedComponent,
};
