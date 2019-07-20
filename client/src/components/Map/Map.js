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
    minZoom: 10,
    maxZoom: 14.5,
    zoom: props.zoom,
    setZoom: props.setZoom,
  });

  const [geoJSON, restaurantMarkersLayer] = useRestaurantMarkers({
    map,
    q: props.query,
  });

  useMarkerClickCallback({
    map,
    layerId: restaurantMarkersLayer,
    callback: props.updateRestaurantIdSelection,
  });

  useMarkerSelection({
    map,
    id: props.restaurantIdSelection,
    geoJSON,
  });

  return <div id="map" />;
}

export default Map;
