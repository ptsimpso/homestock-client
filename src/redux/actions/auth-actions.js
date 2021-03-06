import { SET_CURRENT_USER } from './types';

export const setCurrentUser = ({ user, token }) => {
  return {
    type: SET_CURRENT_USER,
    payload: {
      user,
      token,
    },
  };
};

export const clearCurrentUser = () => {
  return {
    type: SET_CURRENT_USER,
    payload: {
      user: {},
      token: '',
    },
  };
};
