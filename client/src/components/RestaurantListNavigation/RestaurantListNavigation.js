import React from 'react';
import { ButtonGroup, Button, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';

import './RestaurantListNavigation.css'

function navigationSelectorRenderer(item, { handleClick, modifiers }) {
  return (
    <MenuItem 
      key={item}
      text={item}
      active={modifiers.active}
      onClick={handleClick}
    />
  )
}

function RestaurantListNavigation(props) {
  const pageSizes = [ 10, 20, 30 ];
  return (
    <div className="restaurant-list-navigation">
      <div className="navigation-button">
        <ButtonGroup>
          <Button 
            icon="chevron-left"
            onClick={props.handlePagePrev}
          />
          <Button 
            icon="chevron-right"
            onClick={props.handlePageNext}
          />
        </ButtonGroup>
      </div>
      <div className="navigation-selector">
        <Select
          items={pageSizes}
          itemRenderer={navigationSelectorRenderer}
          filterable={false}
          activeItem={props.pageSize}
          onItemSelect={props.handlePageSizeChange}
        >
          <Button
            text={props.pageSize}
            rightIcon="double-caret-vertical"
          />
        </Select>
      </div>
    </div>
  );
}

export default RestaurantListNavigation;