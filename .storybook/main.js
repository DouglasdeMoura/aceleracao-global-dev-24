const path = require('path')

module.exports = {
  stories: [
    '../packages/**/*.stories.mdx',
    '../packages/**/*.stories.@(js|jsx|ts|tsx)',
    '../apps/**/*.stories.mdx',
    '../apps/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],
  framework: '@storybook/react',
  webpackFinal: (config) => {
    config.resolve.alias = {
      '~web': path.resolve(`${process.cwd()}/apps/web/src`),
    }

    return config
  },
}
