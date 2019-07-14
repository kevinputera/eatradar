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

  const itemKey = index => {
    if (props.contents && index < props.contents.length) {
      return props.contents[index].id;
    }
    return index;
  };

  const detectScrollAndFetch = ({ visibleStopIndex }) => {
    if (props.contents.length - visibleStopIndex - 1 <= itemsLeftBeforeLoad) {
      props.handleOffsetIncrement();
    }
  };

  return (
    <div className="restaurant-list-list">
      {props.containerEl && (
        <FixedSizeList
          width="100%"
          height={props.containerEl.clientHeight}
          itemKey={itemKey}
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
                  restaurantSelection={props.restaurantSelection}
                  updateRestaurantSelection={props.updateRestaurantSelection}
                />
              );
            } else {
              // Show loading indicator on the last item
              return <RestaurantListLoading />;
            }
          }}
        </FixedSizeList>
      )}
    </div>
  );
}

export default RestaurantListList;
