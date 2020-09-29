import { SET_ALERT } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ALERT:
      return action.payload;
    default:
      return state;
  }
};
