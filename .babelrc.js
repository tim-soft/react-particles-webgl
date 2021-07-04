module.exports = {
    presets: ['@babel/env', '@babel/react', '@babel/preset-typescript'],
    plugins: [
        ['@babel/plugin-proposal-class-properties'],
        ['@babel/plugin-proposal-object-rest-spread'],
        ['@babel/plugin-transform-runtime', { regenerator: false }],
    ],
};
