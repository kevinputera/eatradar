import React, { useState, useCallback, useMemo } from 'react';
import { Classes, Icon } from '@blueprintjs/core';
import { getDistanceString } from '../../../utils/stringUtils';

import './RestaurantListItem.css';

function RestaurantListItem(props) {
  const [hover, setHover] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setHover(true);
  }, [setHover]);

  const handleMouseLeave = useCallback(() => {
    setHover(false);
  }, [setHover]);

  const updateRestaurantIdSelection = props.updateRestaurantIdSelection;
  const handleClick = useCallback(() => {
    updateRestaurantIdSelection(props.content.id);
  }, [updateRestaurantIdSelection, props.content.id]);

  const isSelected = useMemo(() => {
    return props.restaurantIdSelection === props.content.id;
  }, [props.restaurantIdSelection, props.content.id]);

  return (
    props.content && (
      <div
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={'restaurant-list-item' + (isSelected ? ' active' : '')}
        style={{
          ...props.style,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div className="restaurant-list-item-left">
          {(hover || isSelected) && <Icon icon="chevron-left" />}
          <div className="restaurant-list-item-content">
            <div className="restaurant-list-item-name">
              {props.content.name}
            </div>
            <div className="restaurant-list-item-address">
              <span>
                {props.content.block ? `${props.content.block} ` : ''}
              </span>
              <span>{props.content.street}</span>
            </div>
          </div>
        </div>
        <div className="restaurant-list-item-distance">
          {getDistanceString(props.content.dist)}
        </div>{' '}
      </div>
    )
  );
}

function RestaurantListItemLoading(props) {
  return (
    <div
      className="restaurant-list-item"
      style={{
        ...props.style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div className="restaurant-list-item-left">
        <div className="restaurant-list-item-content">
          <div className={'restaurant-list-item-name ' + Classes.SKELETON}>
            {new Array(30).fill('a').join('')}
          </div>
          <div
            className={'restaurant-list-item-address ' + Classes.SKELETON}
          >
            {new Array(30).fill('a').join('')}
          </div>
        </div>
      </div>
      <div className={'restaurant-list-item-distance ' + Classes.SKELETON}>
        {new Array(4).fill('a').join('')}
      </div>
    </div>
  );
}

export { RestaurantListItem, RestaurantListItemLoading };
