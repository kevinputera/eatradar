import { useState, useEffect, useCallback } from 'react';
import {
  showSuccess,
  showError,
} from '../components/StatusMessage/StatusMessage';

const navigatorConfig = {
  enableHighAccuracy: true,
  timeout: 3000,
  maximumAge: 10000,
};

/**
 * Custom hook to use and store user's location.
 *
 * @param {number[]} initial The initial user location
 * @return {any[]} - The user's location, a function to manually trigger
 * update to the user's location, and a function to stop automatic retry.
 */
export const useUserLocation = initial => {
  const [location, setLocation] = useState(initial);

  // Automatically retrieve user's location.
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      res => setLocation([res.coords.latitude, res.coords.longitude]),
      _ =>
        showError(
          'Failed to retrieve your location. Trying again in 5 seconds.'
        ),
      navigatorConfig
    );
  }, [setLocation]);

  // Function to manually trigger location update
  const refreshLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      res => {
        setLocation([res.coords.latitude, res.coords.longitude]);
        showSuccess('Successfully retrieved your location!');
      },
      _ => showError('Failed to retrieve your location. Please try again.'),
      navigatorConfig
    );
  }, [setLocation]);

  // Function to stop automatic retry when automatic location retrieval fails
  const stopAutoRetry = useCallback(() => {
    console.log('stopped');
  }, []);

  return [...location, refreshLocation, stopAutoRetry];
};
