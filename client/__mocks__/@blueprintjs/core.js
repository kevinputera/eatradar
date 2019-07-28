/**
 * This manual mock only mocks Toaster, Position, and Intent component
 * and is only used in StatusMessage.test.js
 */
const core = jest.requireActual('@blueprintjs/core');

const clearMock = jest.fn();
const showMock = jest.fn();
const Toaster = {
  create: () => ({
    clear: clearMock,
    show: showMock,
  }),
};

module.exports = {
  ...core,
  clearMock,
  showMock,
  Toaster,
};
