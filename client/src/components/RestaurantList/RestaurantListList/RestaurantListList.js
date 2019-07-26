import React from 'react';
import { FixedSizeList } from 'react-window';

import {
  RestaurantListItem,
  RestaurantListItemLoading,
} from '../RestaurantListItem/RestaurantListItem';

import {
  ITEM_SIZE,
  ITEMS_LIMIT,
  ITEMS_LEFT_BEFORE_LOAD,
} from '../../../constants/restaurantListConstants';

import './RestaurantListList.css';

function RestaurantListListLoading(props) {
  const placeholder = new Array(ITEMS_LIMIT).fill(true);
  return placeholder.map((_, index) => (
    <RestaurantListItemLoading
      key={index}
      style={{ height: `${ITEM_SIZE}px` }}
    />
  ));
}

function RestaurantListList(props) {
  const detectScrollAndFetch = ({ visibleStopIndex }) => {
    if (
      props.contents.length - visibleStopIndex - 1 <=
      ITEMS_LEFT_BEFORE_LOAD
    ) {
      props.loadMoreRestaurants();
    }
  };

  return (
    <div className="restaurant-list-list">
      {props.isLoading ? (
        <RestaurantListListLoading />
      ) : (
        <FixedSizeList
          width="100%"
          height={props.containerEl.clientHeight}
          itemSize={ITEM_SIZE}
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
              return <RestaurantListItemLoading style={style} />;
            }
          }}
        </FixedSizeList>
      )}
    </div>
  );
}

export default RestaurantListList;
