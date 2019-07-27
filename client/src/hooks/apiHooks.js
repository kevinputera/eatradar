import { useState, useEffect } from 'react';
import { get } from '../utils/http';

import { showError } from '../components/StatusMessage/StatusMessage';

/**
 * Custom hook to fetch data from an api endpoint
 *
 * @param {string} resource The resource locator, e.g. /restaurants
 * @param {Object} params The parameters used in fetching data
 * @param {string} params.method The HTTP method used in fetching
 * @param {Object} [params.qs] Query string to be appended to request URL. Must be stable(same identity for same value)
 * @param {Object} [params.body] The body of the request. Must be stable(same identity for same value)
 * @param {Object} [params.headers] Headers to be used in HTTP request. Must be stable(same identity for same value)
 * @return The data fetched and a loading indicator, in the form [data, isLoading]
 */
export const useFetchServer = (resource, params) => {
  const { method, headers, qs, body } = params;

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const endpoint = `${process.env.REACT_APP_SERVER_URL}${resource}`;
    const reqParams = { headers, qs, body };

    let cancel = false;
    setLoading(true);

    switch (method) {
      case 'GET':
        get(endpoint, reqParams)
          .then(res => {
            if (!cancel) {
              setData(res.data);
              setLoading(false);
            }
          })
          .catch(() =>
            showError('Failed to connect to server. Please try refreshing the page.')
          );
        break;
      default:
        break;
    }

    return () => {
      cancel = true;
    };
  }, [resource, method, headers, qs, body]);

  return [data, isLoading];
};
