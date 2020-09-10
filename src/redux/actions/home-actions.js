import {
  SET_HOMES,
  SELECT_HOME,
  JOIN_HOME,
  UPDATE_HOME,
  CLEAR_HOME_DATA,
  LEAVE_HOME,
} from './types';

export const setHomes = (homes) => {
  return {
    type: SET_HOMES,
    payload: homes,
  };
};

export const selectHome = (home) => {
  return {
    type: SELECT_HOME,
    payload: home,
  };
};

export const joinHome = (home) => {
  return {
    type: JOIN_HOME,
    payload: home,
  };
};

export const leaveHome = (id) => {
  return {
    type: LEAVE_HOME,
    payload: id,
  };
};

export const updateHome = (home) => {
  return {
    type: UPDATE_HOME,
    payload: home,
  };
};

export const clearHomeData = () => {
  return {
    type: CLEAR_HOME_DATA,
  };
};
