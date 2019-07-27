export const getSummary = (text, summaryLength) => {
  const tokens = text.split(' ');
  if (summaryLength < tokens.length) {
    return tokens.slice(0, summaryLength).join(' ') + '...';
  }
  return tokens.slice(0, summaryLength).join(' ');
};

export const isSummarizable = (text, summaryLength) => {
  return text.trim() !== getSummary(text, summaryLength);
};

export const getDistanceString = dist => {
  const round = Math.round(dist);
  if (round < 1000) {
    return `${round}m`;
  }
  return `${Math.round(round / 1000)}km`;
};

export const capitalize = string => {
  if (!isString(string)) {
    throw new Error('Input is not a string');
  }

  const tokens = string.split(' ');
  return tokens
    .map(token => token.charAt(0).toUpperCase() + token.toLowerCase().slice(1))
    .join(' ');
};

export const isString = string => {
  if (typeof string !== 'string') {
    return false;
  }
  return true;
};
