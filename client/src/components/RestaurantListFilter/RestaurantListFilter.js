import React from 'react';
import { InputGroup } from '@blueprintjs/core';

function RestaurantListFilter(props) {
  return (
    <div className="restaurant-list-filter">
      <InputGroup 
        large
        type="search"
        leftIcon="search"
        placeholder="Search restaurants"
        value={props.query}
        onChange={props.handleQueryInputChange}
      />
    </div>
  )
}

export default RestaurantListFilter;
