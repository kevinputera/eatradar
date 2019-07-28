import { useReducer, useCallback, useEffect } from 'react';

/**
 * Custom hook to expose carousel content and functionality, such as scrolling between content,
 * handling navigation clicks, etc.
 *
 * @param {Object} params
 * @param {number} params.length The number of items in the carousel
 * @param {number} params.timeout Auto scroll interval
 * @return {any[]} The current index, a pair of functions to handle
 * navigation to the next and previous content, and a function to jump to an index.
 * [index, handleNextClick, handlePrevClick, jumpTo]
 */
export const useCarousel = params => {
  const { length, timeout } = params;

  const reducer = useCallback((state, action) => {
    const { index } = state;
    const { jump, length, type } = action;
    switch (type) {
      case 'JUMP':
        return { index: jump };
      case 'NEXT':
        const nextIdx = (index + 1) % length;
        return { index: nextIdx };
      case 'PREV':
        const prevIdx = index - 1 < 0 ? length - 1 : index - 1;
        return { index: prevIdx };
      default:
        return state;
    }
  }, []);

  const [state, dispatch] = useReducer(reducer, { index: 0 });

  const handlePrevClick = useCallback(() => {
    if (length) {
      dispatch({
        type: 'PREV',
        length,
      });
    }
  }, [length]);

  const handleNextClick = useCallback(() => {
    if (length) {
      dispatch({
        type: 'NEXT',
        length,
      });
    }
  }, [length]);

  const jumpTo = useCallback(
    index => {
      if (length) {
        dispatch({
          type: 'JUMP',
          jump: index,
        });
      }
    },
    [length]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextClick();
    }, timeout);
    return () => {
      clearInterval(interval);
    };
  }, [handleNextClick, timeout, state.index]);

  return [state.index, handlePrevClick, handleNextClick, jumpTo];
};
