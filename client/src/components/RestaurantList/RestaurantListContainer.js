import React, { useRef } from 'react';
import { useRestaurantList } from '../../hooks/restaurantHooks';

import RestaurantListList from './RestaurantListList/RestaurantListList';

import './RestaurantListContainer.css';

function RestaurantListContainer(props) {
  const params = {
    lat: props.latitude,
    lng: props.longitude,
    q: props.query,
  };

  const [contents, hasNext, loadMoreRestaurants] = useRestaurantList(params);

  const containerRef = useRef(null);

  return (
    <div className="restaurant-list-container" ref={containerRef}>
      <RestaurantListList
        hasNext={hasNext}
        contents={contents}
        containerEl={containerRef.current}
        restaurantSelection={props.restaurantSelection}
        loadMoreRestaurants={loadMoreRestaurants}
        updateRestaurantSelection={props.updateRestaurantSelection}
      />
    </div>
  );
}

export default RestaurantListContainer;
