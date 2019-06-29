import React from 'react';
import { ButtonGroup, Button, MenuItem, Tooltip } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';

import './RestaurantListNavigation.css';

function navigationSelectorRenderer(item, { handleClick, modifiers }) {
  return (
    <MenuItem
      key={item}
      text={item}
      active={modifiers.active}
      onClick={handleClick}
    />
  );
}

function RestaurantListNavigation(props) {
  const pageSizes = [10, 20, 30];
  return (
    <div className="restaurant-list-navigation">
      <div className="navigation-selector">
        <Select
          items={pageSizes}
          itemRenderer={navigationSelectorRenderer}
          filterable={false}
          activeItem={props.pageSize}
          onItemSelect={props.handlePageSizeChange}
        >
          <Tooltip position="left" content="Restaurants per page">
            <Button text={props.pageSize} rightIcon="double-caret-vertical" />
          </Tooltip>
        </Select>
      </div>
      <div className="navigation-button">
        <ButtonGroup>
          <Tooltip position="top" content="Previous page">
            <Button icon="chevron-left" onClick={props.handlePagePrev} />
          </Tooltip>
          <Tooltip position="top" content="Next page">
            <Button icon="chevron-right" onClick={props.handlePageNext} />
          </Tooltip>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default RestaurantListNavigation;
