import React from 'react';
import { getDistanceString } from '../../../utils/stringUtils';

import './RestaurantListItem.css';

function RestaurantListItem(props) {
  return (
    <div
      style={props.style}
      onClick={() => props.updateRestaurantIdSelection(props.content.id)}
      className={
        'restaurant-list-item bp3-running-text' +
        (props.restaurantIdSelection === props.content.id ? ' active' : '')
      }
    >
      {props.content && (
        <>
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
          <div className="restaurant-list-item-distance">
            {getDistanceString(props.content.dist)}
          </div>{' '}
        </>
      )}
    </div>
  );
}

function RestaurantListLoading(props) {
  return <div style={props.style}>Loading</div>;
}

export { RestaurantListItem, RestaurantListLoading };
