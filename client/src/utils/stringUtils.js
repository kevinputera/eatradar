export const getSummary = (text, summaryLength) => {
  const tokens = text.split(' ');
  return tokens.slice(0, summaryLength).join(' ');
};

export const isSummarizable = (text, summaryLength) => {
  return text.trim() !== getSummary(text, summaryLength);
};
