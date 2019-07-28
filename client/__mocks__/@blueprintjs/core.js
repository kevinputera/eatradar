/**
 * This manual mock only mocks Toaster, Position, and Intent component
 * and is only used in StatusMessage.test.js
 */
const core = jest.requireActual('@blueprintjs/core');

export const clearMock = jest.fn();
export const showMock = jest.fn();

export const Toaster = {
  create: () => ({
    clear: clearMock,
    show: showMock,
  }),
};

export const Position = core.Position;
export const Intent = core.Intent;
