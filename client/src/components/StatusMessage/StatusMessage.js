import { Position, Toaster, Intent } from '@blueprintjs/core';

const StatusMessage = Toaster.create({
  className: 'status-message',
  position: Position.TOP_LEFT,
});

export const showSuccess = message => {
  if (!isToastMessageExist(message)) {
    StatusMessage.show({
      icon: 'tick',
      intent: Intent.SUCCESS,
      timeout: 2000,
      message,
    });
  }
};

export const showError = message => {
  if (!isToastMessageExist(message)) {
    StatusMessage.show({
      icon: 'error',
      intent: Intent.DANGER,
      timeout: 2000,
      message,
    });
  }
};

function isToastMessageExist(message) {
  const toasts = StatusMessage.getToasts();
  for (const toast of toasts) {
    if (toast.message === message) {
      return true;
    }
  }
  return false;
}
