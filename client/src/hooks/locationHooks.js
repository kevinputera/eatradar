import { useState, useEffect, useCallback } from 'react';
import {
  show,
  showSuccess,
  showError,
} from '../components/StatusMessage/StatusMessage';

const navigatorConfig = {
  enableHighAccuracy: true,
  timeout: 1500,
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
    if (setLocation) {
      getLocation({
        setLocation,
        noPermissionMsg:
          'Please enable location services to enable location tracking.',
        errorMsg:
          'Failed to retrieve your location. Trying again in 5 seconds.',
        successMsg: 'We have retrieved your location. You are good to go!',
        retry: true,
      });
    }
  }, [setLocation]);

  // Function to manually trigger location update
  const refreshLocation = useCallback(() => {
    if (setLocation) {
      show('refresh', 'Getting your location...');
      getLocation({
        setLocation,
        noPermissionMsg:
          'Please enable location services to enable location tracking.',
        errorMsg: 'Failed to retrieve your location. Please try again.',
        successMsg: 'Successfully retrieved your location!',
        retry: false,
      });
    }
  }, [setLocation]);

  return [...location, refreshLocation];
};

/**
 * Get user's location, reschedule a retry if it fails.
 *
 * @param {Object} params
 * @param {Function} params.setLocation The update state function used to set location state
 * @param {boolean} params.retry Whether or not to schedule a retry
 * @param {string} params.noPermissionMsg The message to display when permission is denied
 * @param {String} params.errorMsg The message to display when retrieval is unsuccessful
 * @param {string} [params.successMsg] The message to display when retrieval is successful
 */
function getLocation(params) {
  const {
    setLocation,
    successMsg,
    noPermissionMsg,
    errorMsg,
    retry,
  } = params;

  navigator.geolocation.getCurrentPosition(
    res => {
      if (successMsg) {
        showSuccess(successMsg);
      }
      setLocation([res.coords.latitude, res.coords.longitude]);
    },
    error => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          showError(noPermissionMsg);
          break;
        default:
          showError(errorMsg);
          if (retry) {
            setTimeout(() => getLocation(params), 5000);
          }
      }
    },
    navigatorConfig
  );
}
