// Mock for react-native-vector-icons
const React = require('react');
const { View } = require('react-native');

// Create a simple mock component for all vector icons
const MockIcon = (props) => <View testID={props.testID} {...props} />;

// Mock all icon families
const createIcons = () => {
  const icons = {};
  const families = [
    'MaterialIcons',
    'MaterialCommunityIcons',
    'FontAwesome',
    'FontAwesome5',
    'Ionicons',
    'Feather',
    'Entypo',
    'Octicons',
    'SimpleLineIcons',
    'AntDesign',
    'EvilIcons',
    'Fontisto',
    'Zocial',
  ];

  families.forEach((family) => {
    icons[family] = MockIcon;
    // Add the family as a static property to support family.getImageSource()
    MockIcon[family] = MockIcon;
  });

  // Add getImageSource method
  MockIcon.getImageSource = jest.fn(() => Promise.resolve('icon-uri'));
  
  // Add hasIcon method
  MockIcon.hasIcon = jest.fn(() => true);
  
  // Add getRawGlyphMap method
  MockIcon.getRawGlyphMap = jest.fn(() => ({}));
  
  // Add getFontFamily method
  MockIcon.getFontFamily = jest.fn(() => 'System');
  
  return icons;
};

// Create the mock module
const mockIcons = createIcons();

// Add all icon families to the mock
Object.assign(mockIcons, {
  ...mockIcons,
  // Support for direct import of specific icon sets
  default: MockIcon,
  getImageSource: jest.fn(() => Promise.resolve('icon-uri')),
  getImageSourceSync: jest.fn(() => 'icon-uri'),
  getImageSourceSyncWithIconSet: jest.fn(() => 'icon-uri'),
  getImageSourceWithIconSet: jest.fn(() => Promise.resolve('icon-uri')),
  getImageSourceSyncWithIconSet: jest.fn(() => 'icon-uri'),
  getImageSourceSyncWithIconSetAndIcon: jest.fn(() => 'icon-uri'),
  getImageSourceWithIconSetAndIcon: jest.fn(() => Promise.resolve('icon-uri')),
  getImageSourceSyncWithIconSetAndIcon: jest.fn(() => 'icon-uri'),
  getImageSourceSyncWithIconSetAndIconAndSize: jest.fn(() => 'icon-uri'),
  getImageSourceWithIconSetAndIconAndSize: jest.fn(() => Promise.resolve('icon-uri')),
  getImageSourceSyncWithIconSetAndIconAndSize: jest.fn(() => 'icon-uri'),
  getImageSourceSyncWithIconSetAndIconAndSizeAndColor: jest.fn(() => 'icon-uri'),
  getImageSourceWithIconSetAndIconAndSizeAndColor: jest.fn(() => Promise.resolve('icon-uri')),
  getImageSourceSyncWithIconSetAndIconAndSizeAndColor: jest.fn(() => 'icon-uri'),
  getImageSourceSyncWithIconSetAndIconAndSizeAndColorAndStyle: jest.fn(() => 'icon-uri'),
  getImageSourceWithIconSetAndIconAndSizeAndColorAndStyle: jest.fn(() => Promise.resolve('icon-uri')),
  getImageSourceSyncWithIconSetAndIconAndSizeAndColorAndStyle: jest.fn(() => 'icon-uri'),
  getImageSourceSyncWithIconSetAndIconAndSizeAndColorAndStyleAndScale: jest.fn(() => 'icon-uri'),
  getImageSourceWithIconSetAndIconAndSizeAndColorAndStyleAndScale: jest.fn(() => Promise.resolve('icon-uri')),
  getImageSourceSyncWithIconSetAndIconAndSizeAndColorAndStyleAndScale: jest.fn(() => 'icon-uri'),
});

// Export the mock module
module.exports = mockIcons;
