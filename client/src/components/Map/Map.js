import React from 'react';
import {
  useMap,
  useRestaurantMarkers,
  useRestaurantSelection,
} from '../../hooks/mapHooks';

import './Map.css';

function Map(props) {
  const secret = process.env.REACT_APP_MAPBOX_ACCESSTOKEN;

  const map = useMap(secret, {
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [103.9089594, 1.347636],
    zoom: 10.5,
  });

  const geojson = useRestaurantMarkers(secret, { map, qs: props.query });

  useRestaurantSelection(secret, {
    map,
    id: props.restaurantSelection && props.restaurantSelection.id,
    zoom: 12.5,
    geojson,
  });

  return <div id="map" />;
}

export default Map;
