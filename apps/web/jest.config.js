const config = require('config/jest-preset')

module.exports = {
  ...config,
  setupFilesAfterEnv: config.setupFilesAfterEnv.concat(['./.jest/setup.js']),
  moduleNameMapper: {
    ...config.moduleNameMapper,
    '~web/(.*)$': '<rootDir>/src/$1',
  },
  name: 'web-app',
  displayName: 'Web App',
}
