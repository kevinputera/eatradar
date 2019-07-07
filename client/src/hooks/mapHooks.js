import { useState, useEffect, useMemo } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import { useFetchServer } from './apiHooks';

/**
 * Custom hook to initialize a map using Mapbox GL JS.
 *
 * This hook returns a mapboxgl.Map state. The state will only be equal to
 * the initialized mapbox.Map object when the map is loaded, i.e the 'load'
 * event has fired.
 *
 * @param {string} secret Mapbox access key
 * @param {Object} params The parameters to initialize the map with
 * @param {string} params.container The html id of the container where the map will be initialized in
 * @param {string} [params.style] The map style, defaults to mapbox://styles/mapbox/streets-v11
 * @param {number} [params.lng] longitude value of the initial map position, defaults to 103.8089584
 * @param {number} [params.lat] latitude value of the initial map position, defaults to 1.347636
 * @param {number} [params.zoom] Initial map zoom level, defaults to 12
 */
export const useMap = (secret, params) => {
  const [map, setMap] = useState(null);

  const longitude = params.center[0];
  const latitude = params.center[1];
  const center = useMemo(
    () => [longitude || 103.8089584, latitude || 1.347636],
    [longitude, latitude]
  );

  useEffect(() => {
    mapboxgl.accessToken = secret;

    const map = new mapboxgl.Map({
      container: params.container,
      style: params.style || 'mapbox://styles/mapbox/streets-v11',
      zoom: params.zoom || 12,
      center,
    });

    map.on('load', () => setMap(map));
  }, [secret, center, params.container, params.style, params.zoom]);

  return map;
};

/**
 * Custom hook to plot restaurant locations on a Mapbox GL JS map.
 *
 * @param {string} secret Mapbox access key
 * @param {mapboxgl.Map} map The Mapbox GL JS map object to plot in
 * @return {Object} The geojson object of restaurant locations fetched from the server
 */
export const useRestaurantMarkers = (secret, map) => {
  const geojson = useFetchServer('/restaurants', { method: 'GET' });

  useEffect(() => {
    if (map && geojson) {
      mapboxgl.accessToken = secret;

      removeLayerIfExists(map, 'restaurant-markers');

      map.addLayer({
        id: 'restaurant-markers',
        type: 'circle',
        source: {
          type: 'geojson',
          data: geojson,
        },
        paint: {
          'circle-radius': 2,
          'circle-color': '#00aa00',
        },
      });
    }
  }, [secret, map, geojson]);

  return geojson;
};

/**
 * Custom hook to highlight a restaurant that is selected.
 *
 * @param {string} secret Mapbox access key
 * @param {mapboxgl.Map} map The Mapbox GL JS map object to plot in
 * @param {Object} params
 * @param {number} params.id The id of the selected restaurant
 * @param {Object} params.geojson The geojson object of all restaurants
 */
export const useRestaurantSelection = (secret, map, params) => {
  const id = params.id;
  const geojson = params.geojson;

  useEffect(() => {
    if (map && geojson) {
      if (id) {
        mapboxgl.accessToken = secret;
        const single = geojson.features.find(g => g.properties.id === id);

        removeLayerIfExists(map, 'restaurant-selection');

        // highlight selection
        map.addLayer({
          id: 'restaurant-selection',
          type: 'circle',
          source: {
            type: 'geojson',
            data: single,
          },
          paint: {
            'circle-radius': 7,
            'circle-color': '#ff0000',
          },
        });

        // pan to selected restaurant
        map.setZoom(12);
        const center = map.project(single.geometry.coordinates);
        const offsetX = window.innerWidth / 4;
        const offsetY = 0;
        map.panTo(map.unproject([center.x + offsetX, center.y + offsetY]));
      } else {
        removeLayerIfExists(map, 'restaurant-selection');
      }
    }
  }, [secret, map, id, geojson]);
};

function removeLayerIfExists(map, id) {
  if (map.getLayer(id)) {
    map.removeLayer(id);
    map.removeSource(id);
  }
}
