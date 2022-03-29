module.exports = {
  moduleDirectories: ['node_modules'],
  setupFilesAfterEnv: ['@testing-library/jest-dom', 'config/.jest/setup.js'],
  testEnvironment: 'jsdom',
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.ts(x)?',
    '!src/**/*.stories.ts(x)?',
    '!src/**/*.d.ts(x)?',
  ],
  modulePaths: ['<rootDir>/src', '<rootDir>/.jest'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'config/.jest/fileMock.js',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '@swc/jest',
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}
