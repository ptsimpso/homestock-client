import { SET_ALERT } from './types';

export const showAlert = (
  title,
  text,
  inputData,
  actionText,
  shouldBackgroundDismiss = true,
  onActionPress
) => {
  return {
    type: SET_ALERT,
    payload: {
      isVisible: true,
      title,
      text,
      inputData,
      actionText,
      shouldBackgroundDismiss,
      onActionPress,
    },
  };
};

export const dismissAlert = () => {
  return {
    type: SET_ALERT,
    payload: {},
  };
};
