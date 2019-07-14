import { useState, useCallback } from 'react';

/**
 * Custom hook to store and update query input.
 *
 * @param {string} initial The initial query input
 * @return {any[]} - The query input and a function to update that input
 * [queryInput, handleQueryInputChange]
 */
export const useQueryInput = initial => {
  const [queryInput, setQueryInput] = useState(initial);
  const handleQueryInputChange = useCallback(
    e => {
      setQueryInput(e.target.value);
    },
    [setQueryInput]
  );

  return [queryInput, handleQueryInputChange];
};
