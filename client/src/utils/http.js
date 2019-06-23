export const get = async (resource, params) => {
  const endpoint = new URL(`http://localhost:5000${resource}`);
  Object.keys(params).forEach(key => 
    endpoint.searchParams.append(key, params[key])
  );

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  const res = await fetch(endpoint, {
    method: 'GET',
    headers: headers,
  });
  const json = await res.json();

  if (!res.ok) {
    throw new Error(`
      GET request to ${resource} failed, 
      status: ${json.status}, message: ${json.message}`
    );
  }

  return json;
};
