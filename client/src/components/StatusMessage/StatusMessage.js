import { Position, Toaster, Intent } from '@blueprintjs/core';

const StatusMessage = Toaster.create({
  className: 'status-message',
  position: Position.TOP_LEFT,
});

export const showSuccess = message => {
  StatusMessage.clear();
  StatusMessage.show({
    icon: 'tick',
    intent: Intent.SUCCESS,
    timeout: 2000,
    message,
  });
};

export const showError = message => {
  StatusMessage.clear();
  StatusMessage.show({
    icon: 'error',
    intent: Intent.DANGER,
    timeout: 2000,
    message,
  });
};

export const show = (icon, message) => {
  StatusMessage.clear();
  StatusMessage.show({
    icon,
    timeout: 2000,
    message,
  });
};
