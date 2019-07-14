import React from 'react';
import { InputGroup, Button, Tooltip } from '@blueprintjs/core';

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

// <div className="refresh-button-wrapper">
//   <Tooltip position="bottom" content="Update your location">
//     <Button
//       large
//       minimal
//       icon="refresh"
//       onClick={props.handleRefreshButtonClick}
//       style={{ borderRadius: '20px' }}
//     />
//   </Tooltip>
// </div>

export default SearchFilter;
