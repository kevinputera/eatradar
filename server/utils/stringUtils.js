exports.capitalize = string => {
  if (!isString(string)) {
    throw new Error('Input is not a string');
  }

  const tokens = string.split(' ');

  return tokens
    .map(token => token.charAt(0).toUpperCase() + token.toLowerCase().slice(1))
    .join(' ');
};

const isString = string => {
  if (typeof string !== 'string') {
    return false;
  }
  return true;
};
