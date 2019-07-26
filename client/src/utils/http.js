/**
 * Do a GET HTTP request to url.
 *
 * @param {string} url The URL endpoint
 * @param {Object} [params] The parameters used in the HTTP request
 * @param {Object} [params.qs] Query string to be appended to request URL
 * @param {Object} [params.headers] Headers to be used in HTTP request
 * @throws {Error} If response status is not in the 200-299 range
 * @return The JSON value of the response body
 */
export const get = async (url, params) => {
  const endpoint = new URL(url);

  if (params && params.qs) {
    Object.keys(params.qs).forEach(key =>
      endpoint.searchParams.append(key, params.qs[key])
    );
  }

  const config = {
    method: 'GET',
    headers: (params && params.headers) || {
      Accept: 'application/json',
    },
  };
  const res = await fetch(endpoint, config);
  const json = await res.json();

  if (!res.ok) {
    throw new Error(`
      GET request to ${endpoint} failed,\n 
      status: ${json.status}, message: ${json.message}`);
  }

  return json;
};
