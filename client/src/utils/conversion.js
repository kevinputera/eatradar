export const getDistanceString = dist => {
  const round = Math.round(dist);
  if (round < 1000) {
    return `${round}m`;
  }
  return `${Math.round(round / 1000)}km`;
};
