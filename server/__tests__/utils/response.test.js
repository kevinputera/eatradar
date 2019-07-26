const { sendOk } = require('../../utils/response');

const res = {
  status: jest.fn(() => res),
  send: jest.fn(),
};

beforeEach(() => {
  res.status.mockClear();
  res.send.mockClear();
});

test('sendOk must return 200 status and supplied body', () => {
  const body = { payload: 5 };
  sendOk(res, body);

  expect(res.status).toHaveBeenCalledTimes(1);
  expect(res.status).toHaveBeenCalledWith(200);

  expect(res.send).toHaveBeenCalledTimes(1);
  expect(res.send).toHaveBeenCalledWith({
    status: 200,
    message: '',
    data: body,
  });
});
