export const get = async (resource, params) => {
  const endpoint = new URL(`${process.env.REACT_APP_SERVER_URL}${resource}`);
  if (params) {
    Object.keys(params).forEach(key =>
      endpoint.searchParams.append(key, params[key])
    );
  }

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const res = await fetch(endpoint, {
    method: 'GET',
    headers: headers,
  });
  const json = await res.json();

  if (!res.ok) {
    throw new Error(`
      GET request to ${resource} failed,\n 
      status: ${json.status}, message: ${json.message}`);
  }

  return json;
};
