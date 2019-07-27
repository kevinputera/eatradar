const { getBlogPosts } = require('../../controllers/blogPostController');
const blogPostService = require('../../service/blogPostService');
const response = require('../../utils/response');

jest.mock('../../service/blogPostService');
jest.mock('../../utils/response');

beforeEach(() => {
  response.sendOk.mockClear();
  response.sendBadRequest.mockClear();
  response.sendInternalError.mockClear();
});

describe('tests for getBlogPosts controller', () => {
  test('non-integer id must result in a bad request', async () => {
    const id = 'asdf';
    const req = { params: { id } };
    await getBlogPosts(req);
    expect(response.sendBadRequest).toHaveBeenCalledTimes(1);
  });

  test('integer id smaller than zero must result in a bad request', async () => {
    const id = -1;
    const req = { params: { id } };
    await getBlogPosts(req);
    expect(response.sendBadRequest).toHaveBeenCalledTimes(1);
  });

  test('must return result from blogPostService.getBlogPosts', async () => {
    const result = ['blog post'];
    blogPostService.getBlogPosts.mockResolvedValue(result);

    const id = 1;
    const req = { params: { id } };
    await getBlogPosts(req);
    expect(response.sendOk).toHaveBeenCalledTimes(1);
    expect(response.sendOk.mock.calls[0][1]).toEqual(result);
  });

  test('must send internal error if blogPostService.getBlogPosts throws', async () => {
    const error = { message: 'getBlogPosts error' };
    blogPostService.getBlogPosts.mockRejectedValue(error);

    const id = 1;
    const req = { params: { id } };
    await getBlogPosts(req);
    expect(response.sendInternalError).toHaveBeenCalledTimes(1);
    expect(response.sendInternalError.mock.calls[0][1]).toEqual(error.message);
  });
});
