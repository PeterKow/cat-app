module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|ts|tsx)$': 'babel-jest',
  },
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
    '|@react-native' +
    '|@react-navigation' +
    '|@react-native-async-storage/async-storage' +
    '|react-native-toast-message' +
    ')/)'
  ],
  testPathIgnorePatterns: ['/node_modules/', '/e2e/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@assets/(.*)$': '<rootDir>/assets/$1',
    '^@components/(.*)$': '<rootDir>/components/$1',
    '^@hooks/(.*)$': '<rootDir>/hooks/$1',
    '^@navigation/(.*)$': '<rootDir>/navigation/$1',
    '^@screens/(.*)$': '<rootDir>/screens/$1',
    '^@modules/(.*)$': '<rootDir>/modules/$1',
    '^@services/(.*)$': '<rootDir>/services/$1',
    '^@store/(.*)$': '<rootDir>/store/$1',
    '^@utils/(.*)$': '<rootDir>/utils/$1'
  }
}
