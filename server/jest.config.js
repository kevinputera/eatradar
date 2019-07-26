module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.js',
    '!scripts/**/*',
    '!coverage/**/*',
    '!constants/**/*',
    '!config/**/*',
    '!jest.config.js',
  ],
};
