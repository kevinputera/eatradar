import React, { useRef, useState, useEffect } from 'react';
import { useRestaurantList } from '../../hooks/restaurantHooks';

import RestaurantListList from './RestaurantListList/RestaurantListList';

import './RestaurantListContainer.css';

function RestaurantListContainer(props) {
  const params = {
    lat: props.latitude,
    lng: props.longitude,
    q: props.query,
  };

  const [
    contents,
    isRestaurantListLoading,
    hasNext,
    loadMoreRestaurants,
  ] = useRestaurantList(params);

  // Setup container ref and delay rendering child
  const [renderChild, setRenderChild] = useState(false);
  const containerRef = useRef(null);
  useEffect(() => {
    setRenderChild(true);
  }, []);

  return (
    <div className="restaurant-list-container" ref={containerRef}>
      {renderChild && (
        <RestaurantListList
          hasNext={hasNext}
          contents={contents}
          containerEl={containerRef.current}
          restaurantIdSelection={props.restaurantIdSelection}
          loadMoreRestaurants={loadMoreRestaurants}
          updateRestaurantIdSelection={props.updateRestaurantIdSelection}
        />
      )}
    </div>
  );
}

export default RestaurantListContainer;
