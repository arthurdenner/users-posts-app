module.exports = {
  verbose: true,
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: {
    '\\.(less)$': 'identity-obj-proxy',
    '\\.less$': require.resolve('./test/style-mock.js'),
  },
  globals: {
    window: {},
    'ts-jest': {
      diagnostics: false,
      tsConfig: './tsconfig.json',
    },
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
  testPathIgnorePatterns: ['/node_modules/', 'examples'],
  setupTestFrameworkScriptFile: require.resolve('./test/setup-tests.js'),
  collectCoverageFrom: ['!**/src/**/*.d.ts', '**/src/**/*.(js|jsx|ts|tsx)'],
  coverageThreshold: {
    global: {
      statements: 17,
      branches: 4,
      lines: 17,
      functions: 20,
    },
  },
};
