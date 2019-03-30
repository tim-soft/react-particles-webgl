module.exports = {
  presets: ['@babel/env', '@babel/react'],
  plugins: [
    ['@babel/plugin-proposal-class-properties'],
    ['@babel/plugin-proposal-object-rest-spread'],
    ['transform-react-remove-prop-types', { removeImport: true }],
    ['@babel/plugin-transform-runtime', { regenerator: false }]
  ]
};
