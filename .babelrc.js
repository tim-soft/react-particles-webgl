module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          browsers: 'last 2 Chrome versions',
          node: 'current'
        }
      }
    ],
    '@babel/react'
  ],
  plugins: [
    'babel-plugin-styled-components',
    '@babel/plugin-proposal-class-properties'
  ]
};
