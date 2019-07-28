import { Intent, clearMock, showMock } from '@blueprintjs/core';
import {
  showSuccess,
  showError,
  show,
} from '../../../components/StatusMessage/StatusMessage';

jest.mock('@blueprintjs/core');

describe('tests for StatusMessage utility functions', () => {
  beforeEach(() => {
    clearMock.mockClear();
    showMock.mockClear();
  });

  test('showSuccess must show toast with correct intent, icon and message', () => {
    const message = 'A success message';
    showSuccess(message);
    expect(clearMock).toHaveBeenCalledTimes(1);
    expect(showMock).toHaveBeenCalledTimes(1);
    expect(showMock).toHaveBeenCalledWith(
      expect.objectContaining({
        icon: 'tick',
        intent: Intent.SUCCESS,
        message,
      })
    );
  });

  test('showError must show toast with correct intent, icon and message', () => {
    const message = 'An error message';
    showError(message);
    expect(clearMock).toHaveBeenCalledTimes(1);
    expect(showMock).toHaveBeenCalledTimes(1);
    expect(showMock).toHaveBeenCalledWith(
      expect.objectContaining({
        icon: 'error',
        intent: Intent.DANGER,
        message,
      })
    );
  });

  test('show must show toast with correct icon and message', () => {
    const icon = 'locate';
    const message = 'A message';
    show(icon, message);
    expect(clearMock).toHaveBeenCalledTimes(1);
    expect(showMock).toHaveBeenCalledTimes(1);
    expect(showMock).toHaveBeenCalledWith(
      expect.objectContaining({
        icon,
        message,
      })
    );
  });
});
