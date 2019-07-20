import React, { useState } from 'react';
import { useRestaurantIdSelection } from './hooks/restaurantHooks';
import { useUserLocation } from './hooks/locationHooks';

import RestaurantListContainer from './components/RestaurantList/RestaurantListContainer';
import RestaurantDetailContainer from './components/RestaurantDetail/RestaurantDetailContainer';
import SearchFilter from './components/SearchFilter/SearchFilter';
import Map from './components/Map/Map';

import './AppContainer.css';

function App(props) {
  const [queryInput, setQueryInput] = useState('');

  const [
    restaurantIdSelection,
    updateRestaurantIdSelection,
    clearRestaurantIdSelection,
  ] = useRestaurantIdSelection();

  const [
    latitude,
    longitude,
    refreshLocation,
    stopAutoRetry,
  ] = useUserLocation([1.3033702, 103.8283541]);

  return (
    <div className="app">
      <div className="map-wrapper">
        <Map
          query={queryInput}
          restaurantIdSelection={restaurantIdSelection}
          updateRestaurantIdSelection={updateRestaurantIdSelection}
        />
      </div>
      <div className="search-filter-wrapper">
        <SearchFilter updateQueryInput={setQueryInput} />
      </div>
      <div className="restaurant-list-wrapper card-wrapper">
        <RestaurantListContainer
          query={queryInput}
          latitude={latitude}
          longitude={longitude}
          restaurantIdSelection={restaurantIdSelection}
          updateRestaurantIdSelection={updateRestaurantIdSelection}
        />
      </div>
      {!!restaurantIdSelection && (
        <div className="restaurant-detail-wrapper card-wrapper">
          <RestaurantDetailContainer
            restaurantIdSelection={restaurantIdSelection}
            clearRestaurantIdSelection={clearRestaurantIdSelection}
          />
        </div>
      )}
    </div>
  );
}

export default App;
