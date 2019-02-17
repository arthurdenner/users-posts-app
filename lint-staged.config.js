module.exports = {
  linters: {
    '**/*.(js|jsx|ts|tsx)': [
      'npm run lint:fix',
      'npm run prettier:format',
      'jest --findRelatedTests',
    ],
    '**/*.less': ['npm run lint:css', 'npm run prettier:format'],
  },
};
