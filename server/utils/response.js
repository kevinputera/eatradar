function responseObject(params) {
  return {
    status: params.status || 200,
    message: params.message || '',
    data: params.data || {},
  };
}

exports.sendOk = (res, body) => {
  res.status(200).send(
    responseObject({
      status: 200,
      data: body,
    })
  );
};

exports.sendBadRequest = (res, message) => {
  res.status(400).send(
    responseObject({
      status: 400,
      message: message,
    })
  );
};

exports.sendInternalError = (res, message) => {
  res.status(500).send(
    responseObject({
      status: 500,
      message: message,
    })
  );
};
