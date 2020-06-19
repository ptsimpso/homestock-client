import { SET_CURRENT_USER } from '../actions/types';

const INITIAL_STATE = {
  currentUser: null, // props: _id, name, email
  token: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      const { user, token } = action.payload;

      return {
        ...state,
        currentUser: user,
        token,
      };
    default:
      return state;
  }
};
