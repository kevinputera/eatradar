import { useState, useCallback } from 'react';

/**
 * Custom hook to expose pagination controls for single-content per page contents.
 *
 * @param {number} size The number of pages in total
 * @return {any[]} The current offset page, a function to decrease offset page,
 * and a function to increase offset page. [offset, handleOffsetDecr, handleOffsetIncr]
 */
export const usePaginatedContent = size => {
  const [offset, setOffset] = useState(0);

  const handleOffsetDecr = useCallback(() => {
    setOffset(o => {
      if (o === 0) {
        return size - 1;
      }
      return o - 1;
    });
  }, [offset, size]);

  const handleOffsetIncr = useCallback(() => {
    setOffset(o => {
      if (o === size - 1) {
        return 0;
      }
      return o + 1;
    });
  }, [offset, size]);

  return [offset, handleOffsetDecr, handleOffsetIncr];
};
