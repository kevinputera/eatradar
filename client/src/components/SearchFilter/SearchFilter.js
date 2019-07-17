import React, { useState, useCallback } from 'react';
import { throttle } from 'lodash';
import { InputGroup } from '@blueprintjs/core';

import './SearchFilter.css';

function SearchFilter(props) {
  const [input, setInput] = useState('');

  const throttledUpdateQueryInput = useCallback(
    throttle(props.updateQueryInput, 300),
    [props.updateQueryInput]
  );
  const handleInputChange = useCallback(e => {
    setInput(e.target.value);
    throttledUpdateQueryInput(e.target.value);
  });

  return (
    <div className="search-filter">
      <InputGroup
        large
        type="search"
        leftIcon="search"
        placeholder="Search restaurants"
        value={input}
        onChange={handleInputChange}
        style={{ borderRadius: '10px' }}
      />
    </div>
  );
}

export default SearchFilter;
