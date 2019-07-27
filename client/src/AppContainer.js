import React, { useState } from 'react';
import { useRestaurantIdSelection } from './hooks/restaurantHooks';
import { useUserLocation } from './hooks/locationHooks';
import { useMapZoom } from './hooks/mapHooks';

import RestaurantListContainer from './components/RestaurantList/RestaurantListContainer';
import RestaurantDetailContainer from './components/RestaurantDetail/RestaurantDetailContainer';
import MapActionContainer from './components/MapAction/MapActionContainer';
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

  const [latitude, longitude, refreshLocation] = useUserLocation([
    1.3033702,
    103.8283541,
  ]);

  const [zoom, setZoom, handleZoomIn, handleZoomOut] = useMapZoom(10.5, 10, 14.5);

  return (
    <div className="app">
      <div className="map-wrapper">
        <Map
          zoom={zoom}
          query={queryInput}
          restaurantIdSelection={restaurantIdSelection}
          setZoom={setZoom}
          updateRestaurantIdSelection={updateRestaurantIdSelection}
        />
      </div>
      <div className="search-filter-wrapper">
        <SearchFilter updateQueryInput={setQueryInput} />
      </div>
      <div className="map-action-wrapper">
        <MapActionContainer
          handleZoomIn={handleZoomIn}
          handleZoomOut={handleZoomOut}
          refreshLocation={refreshLocation}
        />
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
