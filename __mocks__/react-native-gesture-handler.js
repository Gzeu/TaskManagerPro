// Mock for react-native-gesture-handler
export const GestureHandlerRootView = 'GestureHandlerRootView';
export const Swipeable = 'Swipeable';
export const DrawerLayout = 'DrawerLayout';

// Add gesture handlers you use
export const PanGestureHandler = 'PanGestureHandler';
export const TapGestureHandler = 'TapGestureHandler';
export const LongPressGestureHandler = 'LongPressGestureHandler';
export const FlingGestureHandler = 'FlingGestureHandler';

// Directions
export const Directions = {
  RIGHT: 1,
  LEFT: 2,
  UP: 4,
  DOWN: 8,
};

// State
export const State = {
  UNDETERMINED: 0,
  FAILED: 1,
  BEGAN: 2,
  CANCELLED: 3,
  ACTIVE: 4,
  END: 5,
};

// Gesture state callbacks
export const gestureHandlerRootHOC = (Component) => Component;

export const createNativeWrapper = (Component, config) => Component;

export const BaseButton = 'BaseButton';
export const BorderlessButton = 'BorderlessButton';
export const RectButton = 'RectButton';
export const TouchableOpacity = 'TouchableOpacity';
export const TouchableHighlight = 'TouchableHighlight';
export const TouchableWithoutFeedback = 'TouchableWithoutFeedback';

// Default export for backward compatibility
export default {
  GestureHandlerRootView,
  Swipeable,
  DrawerLayout,
  PanGestureHandler,
  TapGestureHandler,
  LongPressGestureHandler,
  FlingGestureHandler,
  Directions,
  State,
  gestureHandlerRootHOC,
  createNativeWrapper,
  BaseButton,
  BorderlessButton,
  RectButton,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
};
