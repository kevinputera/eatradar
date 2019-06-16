exports.get = async body => {
  const endpoint = 'http://localhost:5000';
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
  return await fetch(endpoint, {
    method: 'GET',
    headers: headers,
    body: JSON.stringify(body),
  });
};
