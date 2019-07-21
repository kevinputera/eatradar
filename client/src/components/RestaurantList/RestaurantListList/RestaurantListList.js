import React from 'react';
import { FixedSizeList } from 'react-window';

import {
  RestaurantListItem,
  RestaurantListLoading,
} from '../RestaurantListItem/RestaurantListItem';

import './RestaurantListList.css';

function RestaurantListList(props) {
  const itemSize = 90;
  const itemsLeftBeforeLoad = 3;

  const detectScrollAndFetch = ({ visibleStopIndex }) => {
    if (
      props.contents.length - visibleStopIndex - 1 <=
      itemsLeftBeforeLoad
    ) {
      props.loadMoreRestaurants();
    }
  };

  return (
    <div className="restaurant-list-list">
      <FixedSizeList
        width="100%"
        height={props.containerEl.clientHeight}
        itemSize={itemSize}
        itemCount={
          props.contents.length && props.hasNext
            ? props.contents.length + 1
            : props.contents.length
        }
        onItemsRendered={detectScrollAndFetch}
      >
        {({ index, style }) => {
          if (index !== props.contents.length) {
            return (
              <RestaurantListItem
                style={style}
                content={props.contents[index]}
                restaurantIdSelection={props.restaurantIdSelection}
                updateRestaurantIdSelection={
                  props.updateRestaurantIdSelection
                }
              />
            );
          } else {
            // Show loading indicator on the last item
            return <RestaurantListLoading style={style} />;
          }
        }}
      </FixedSizeList>
    </div>
  );
}

export default RestaurantListList;
