import { useReducer, useCallback, useEffect } from 'react';

/**
 * Custom hook to expose carousel content and functionality, such as scrolling between content,
 * handling navigation clicks, etc.
 *
 * @param {Object} params
 * @param {string[]} params.contents The string contents to display
 * @param {number} params.timeout Auto scroll interval
 * @return {any[]} The current content, the current index, a pair of functions to handle
 * navigation to the next and previous content, and a function to jump to an index.
 * [content, index, handleNextClick, handlePrevClick, jumpTo]
 */
export const useCarousel = params => {
  const { contents, timeout } = params;

  const reducer = useCallback((state, action) => {
    const { index } = state;
    const { jump, contents, type } = action;
    switch (type) {
      case 'JUMP':
        return { index: jump };
      case 'NEXT':
        const nextIdx = (index + 1) % contents.length;
        return { index: nextIdx };
      case 'PREV':
        const prevIdx = index - 1 < 0 ? contents.length - 1 : index - 1;
        return { index: prevIdx };
      default:
        return state;
    }
  }, []);

  const [state, dispatch] = useReducer(reducer, { index: 0 });

  const handlePrevClick = useCallback(() => {
    if (contents) {
      dispatch({
        type: 'PREV',
        contents,
      });
    }
  }, [contents]);

  const handleNextClick = useCallback(() => {
    if (contents) {
      dispatch({
        type: 'NEXT',
        contents,
      });
    }
  }, [contents]);

  const jumpTo = useCallback(
    index => {
      if (contents) {
        dispatch({
          type: 'JUMP',
          jump: index,
        });
      }
    },
    [contents]
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
