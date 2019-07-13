import React from 'react';
import {
  useMap,
  useRestaurantMarkers,
  useMarkerSelection,
  useMarkerClickCallback,
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

  const [geoJSON, restaurantMarkersLayer] = useRestaurantMarkers({
    map,
    qs: props.query,
  });

  useMarkerClickCallback({
    map,
    layerId: restaurantMarkersLayer,
    callback: props.updateRestaurantSelection,
  });

  useMarkerSelection({ map, id: props.restaurantSelection, geoJSON });

  return <div id="map" />;
}

export default Map;
