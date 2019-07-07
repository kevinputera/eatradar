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
 * Custom hook to plot markers on a Mapbox GL JS map.
 *
 * @param {string} secret Mapbox access key
 * @param {mapboxgl.Map} map The Mapbox GL JS map object to plot in
 * @param {string} resource Server resource locator to get the GeoJSON data from
 */
export const useFeatureCollectionMarkers = (secret, map, resource) => {
  const [markers, setMarkers] = useState([]);
  const data = useFetchServer('/restaurants', { method: 'GET' });

  useEffect(() => {
    if (map && data) {
      mapboxgl.accessToken = secret;
      map.addLayer({
        id: 'restaurants',
        type: 'circle',
        source: {
          type: 'geojson',
          data,
        },
        paint: {
          'circle-radius': 2,
          'circle-color': '#00aa00',
        },
      });
    }
  }, [secret, map, data]);

  return markers;
};
