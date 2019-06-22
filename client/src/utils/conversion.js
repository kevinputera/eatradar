export const getDistanceString = dist => {
  if (dist < 1000) {
    return `${dist}m`;
  }
  return `${Math.round(dist / 1000)}km`
};
