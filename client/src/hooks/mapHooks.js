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
 * @param {number[]} [params.center] longitude, latitude value of the initial map position, defaults to 103.8089584, 1.347636
 * @param {number} [params.zoom] Initial map zoom level, defaults to 12
 */
export const useMap = (secret, params) => {
  const [map, setMap] = useState(null);

  let longitude;
  let latitude;
  if (params.center) {
    longitude = params.center[0] || 103.8089584;
    latitude = params.center[1] || 1.347636;
  } else {
    longitude = 103.8089584;
    latitude = 1.347636;
  }

  useEffect(() => {
    mapboxgl.accessToken = secret;

    const map = new mapboxgl.Map({
      container: params.container,
      style: params.style || 'mapbox://styles/mapbox/streets-v11',
      zoom: params.zoom || 12,
      minZoom: params.minZoom,
      maxZoom: params.maxZoom,
      center: [longitude, latitude],
    });

    map.on('load', () => setMap(map));
  }, [
    secret,
    longitude,
    latitude,
    params.container,
    params.style,
    params.zoom,
    params.minZoom,
    params.maxZoom,
  ]);

  return map;
};

/**
 * Custom hook to plot restaurant locations on a Mapbox GL JS map.
 *
 * @param {Object} params The parameters to plot with
 * @param {mapboxgl.Map} params.map The Mapbox GL JS map object to plot in
 * @param {string} params.q The restaurant name used to filter the result
 * @return {Object} A list of a GeoJSON object of all restaurant locations fetched from the server
 * and the layer id where the restaurants are plot
 */
export const useRestaurantMarkers = params => {
  const { map, q } = params;

  const layerId = 'restaurant-markers';
  const filteredLayerId = 'filtered-restaurant-markers';

  const radius = ['interpolate', ['linear'], ['zoom'], 10, 2.5, 14, 5];
  const filteredRadius = [
    'interpolate',
    ['linear'],
    ['zoom'],
    10,
    4,
    14,
    6,
  ];
  const color = 'rgba(0, 100, 0, 0.5)';
  const filteredColor = 'rgba(0, 100, 0, 0.8)';

  // Get all the restaurants and plot in the map
  const fullGeoJSON = useFetchRestaurantLocationsWithQuery();
  useEffect(() => {
    if (map && fullGeoJSON) {
      map.addLayer({
        id: layerId,
        type: 'circle',
        source: {
          type: 'geojson',
          data: fullGeoJSON,
        },
        paint: {
          'circle-radius': radius,
          'circle-color': color,
        },
      });

      return () => {
        removeLayerIfExists(map, layerId);
      };
    }
  }, [map, fullGeoJSON]);

  // Filter out the restaurants based on the query
  const filteredGeoJSON = useFetchRestaurantLocationsWithQuery(q);
  useEffect(() => {
    if (map && q && filteredGeoJSON) {
      map.addLayer({
        id: filteredLayerId,
        type: 'circle',
        source: {
          type: 'geojson',
          data: filteredGeoJSON,
        },
        paint: {
          'circle-radius': filteredRadius,
          'circle-color': filteredColor,
        },
      });

      return () => {
        removeLayerIfExists(map, filteredLayerId);
      };
    }
  }, [map, q, filteredGeoJSON]);

  // Do not repaint all the points. Instead, use two layers and flip between them.
  useEffect(() => {
    if (map && map.getLayer(layerId)) {
      if (q) {
        map.setLayoutProperty(layerId, 'visibility', 'none');
      } else {
        map.setLayoutProperty(layerId, 'visibility', 'visible');
      }
    }
  }, [map, q]);

  if (q) {
    return [filteredGeoJSON, filteredLayerId];
  }
  return [fullGeoJSON, layerId];
};

/**
 * Wrapper on top of useFetchServer, used to retrieve restaurant GeoJSON locations
 * filtered by q.
 *
 * @param [q] The filter query
 * @return GeoJSON locations
 */
export const useFetchRestaurantLocationsWithQuery = q => {
  const params = useMemo(() => {
    if (q) {
      return { method: 'GET', qs: { q } };
    }
    return { method: 'GET' };
  }, [q]);
  return useFetchServer('/restaurant-locations', params)[0];
};

/**
 * Custom hook to highlight a marker that is selected.
 *
 * @param {Object} params Parameters
 * @param {mapboxgl.Map} params.map The Mapbox GL JS map object to plot in
 * @param {number} params.id The id of the selected marker
 * @param {Object} params.geoJSON The GeoJSON object of marker, with id field in its properties
 */
export const useMarkerSelection = params => {
  const { id, geoJSON, map } = params;
  useEffect(() => {
    if (map && geoJSON) {
      if (id) {
        const single = geoJSON.features.find(g => g.properties.id === id);

        // highlight selection
        map.addLayer({
          id: 'marker-selection',
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
        if (single) {
          const center = map.project(single.geometry.coordinates);
          const offsetX = window.innerWidth / 4;
          const offsetY = 0;
          map.panTo(
            map.unproject([center.x + offsetX, center.y + offsetY])
          );
        }

        return () => {
          removeLayerIfExists(map, 'marker-selection');
        };
      }
    }
  }, [map, id, geoJSON]);
};

/**
 * Custom hook to register callback when a restaurant marker is clicked.
 * Callback passed in must be stable, i.e. its identity don't change if
 * it is the same function by value.
 *
 * @param {Object} params Parameters
 * @param {mapboxgl.Map} params.map The Mapbox GL JS map object
 * @param {string} params.layerId The layer id where the callback is to be registered
 * @param {(id: number) => void} params.callback The callback to use when a marker is clicked
 */
export const useMarkerClickCallback = params => {
  const { map, layerId, callback } = params;
  useEffect(() => {
    if (map && layerId) {
      const clickHandler = e => callback(e.features[0].properties.id);
      const setPointerCursor = () =>
        (map.getCanvas().style.cursor = 'pointer');
      const setGrabCursor = () => (map.getCanvas().style.cursor = 'grab');

      map.on('click', layerId, clickHandler);
      map.on('mouseenter', layerId, setPointerCursor);
      map.on('mouseleave', layerId, setGrabCursor);

      return () => {
        map.off('click', layerId, clickHandler);
        map.off('mouseover', layerId, setPointerCursor);
        map.off('mouseleave', layerId, setGrabCursor);
      };
    }
  }, [map, layerId, callback]);
};

function removeLayerIfExists(map, id) {
  if (map.getLayer(id)) {
    map.removeLayer(id);
    map.removeSource(id);
  }
}
