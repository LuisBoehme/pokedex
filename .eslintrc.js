module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['import'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        alias: {
          _assets: './src/assets',
          _components: './src/components',
          _pages: './src/scenes',
          _services: './src/services',
          _styles: './src/styles',
          _utils: './src/utils',
        },
      },
    },
  },
};
