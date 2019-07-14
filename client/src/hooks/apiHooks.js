import { useState, useEffect, useMemo } from 'react';
import { get } from '../utils/http';

import { showError } from '../components/StatusMessage/StatusMessage';

/**
 * Custom hook to fetch data from an api endpoint
 *
 * @param {string} resource The resource locator, e.g. /restaurants
 * @param {Object} params The parameters used in fetching data
 * @param {string} params.method The HTTP method used in fetching
 * @param {Object} [params.qs] Query string to be appended to request URL
 * @param {Object} [params.headers] Headers to be used in HTTP request
 * @return The data fetched
 */
export const useFetchServer = (resource, params) => {
  const [data, setData] = useState(null);

  const method = params.method;
  const headers = params.headers;
  const qs = params.qs;
  const reqParams = useMemo(() => ({ headers, qs }), [headers, qs]);

  useEffect(() => {
    const endpoint = `${process.env.REACT_APP_SERVER_URL}${resource}`;
    let cancel = false;

    switch (method) {
      case 'GET':
        get(endpoint, reqParams)
          .then(res => {
            if (!cancel) {
              setData(res.data);
            }
          })
          .catch(() => showError('Failed to connect to server. Please try refreshing the page.'));
        break;
      default:
        break;
    }

    return () => {
      cancel = true;
    };
  }, [resource, method, reqParams]);

  return data;
};
