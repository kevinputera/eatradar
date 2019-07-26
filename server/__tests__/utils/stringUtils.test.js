const { capitalize } = require('../../utils/stringUtils');

describe('tests for the captalize function', () => {
  test('numbers input should result in error', () => {
    const text = 123;
    expect(() => capitalize(text)).toThrow();
  });

  test('capitalize should capitalize each word token', () => {
    const text = 'hello world';
    const capitalized = 'Hello World';
    expect(capitalize(text)).toBe(capitalized);
  });
});
