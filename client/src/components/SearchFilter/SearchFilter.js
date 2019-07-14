import React from 'react';
import { InputGroup } from '@blueprintjs/core';

import './SearchFilter.css';

function SearchFilter(props) {
  return (
    <div className="search-filter">
      <InputGroup
        large
        leftIcon="search"
        placeholder="Search restaurants"
        value={props.query}
        onChange={props.handleQueryInputChange}
        style={{ borderRadius: '10px' }}
      />
    </div>
  );
}

export default SearchFilter;
