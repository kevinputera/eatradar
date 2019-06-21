import React from 'react';
import { InputGroup, Button } from '@blueprintjs/core';

import './RestaurantListFilter.css';

function RestaurantListFilter(props) {
  return (
    <div className="restaurant-list-filter">
      <div className="search-input-wrapper">
        <InputGroup 
          large
          type="search"
          leftIcon="search"
          placeholder="Search restaurants"
          value={props.query}
          onChange={props.handleQueryInputChange}
        />
      </div>
      <div className="refresh-button-wrapper">
        <Button
          large
          minimal
          icon="refresh"
          onClick={props.handleRefreshButtonClick}
          style={{ borderRadius: '20px' }}
        />
      </div>
    </div>
  )
}

export default RestaurantListFilter;
