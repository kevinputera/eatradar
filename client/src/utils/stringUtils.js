export const getSummary = (text, summaryLength) => {
  const tokens = text.split(' ');
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
