module.exports = {
  presets: [
    '@babel/env',
    '@babel/react',
    '@babel/typescript',
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        absoluteRuntime: false,
        corejs: 3,
        helpers: true,
        regenerator: true,
        useESModules: false,
      },
    ],
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-syntax-class-properties',
    '@babel/plugin-proposal-function-sent',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-throw-expressions',
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],

  ],
  env: {
    production: {
      only: ['src'],
      plugins: [
        'lodash',
        'transform-react-remove-prop-types',
        '@babel/plugin-transform-react-inline-elements',
        '@babel/plugin-transform-react-constant-elements',
      ],
    },
    test: {
      plugins: [
        '@babel/plugin-transform-modules-commonjs',
        'dynamic-import-node',
      ],
    },
  },
};
