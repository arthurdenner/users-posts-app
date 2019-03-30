const isTest = String(process.env.NODE_ENV) === 'test';

module.exports = {
  presets: [
    [
      '@babel/env',
      { useBuiltIns: 'usage', modules: isTest ? 'commonjs' : false },
    ],
    '@babel/typescript',
    '@babel/react',
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    'react-hot-loader/babel',
  ],
};
