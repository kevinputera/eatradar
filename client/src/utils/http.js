export const get = async (resource, params) => {
  const endpoint = new URL(`http://localhost:5000${resource}`);
  Object.keys(params).forEach(key => 
    endpoint.searchParams.append(key, params[key])
  );

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  return await fetch(endpoint, {
    method: 'GET',
    headers: headers,
  });
};
