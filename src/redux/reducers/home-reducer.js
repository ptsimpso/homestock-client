import {
  SET_HOMES,
  SELECT_HOME,
  JOIN_HOME,
  UPDATE_HOME,
  CLEAR_HOME_DATA,
} from '../actions/types';

const INITIAL_STATE = {
  all: null,
  selectedHome: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_HOMES:
      const homes = action.payload;
      let selectedHome;

      if (state.selectedHome) {
        const updatedSelectedHome = homes.find(
          (home) => home._id === state.selectedHome._id
        );

        if (updatedSelectedHome) {
          selectedHome = updatedSelectedHome;
        }
      }

      if (!selectedHome) {
        selectedHome = homes[0];
      }

      return {
        all: homes,
        selectedHome,
      };
    case SELECT_HOME:
      return {
        ...state,
        selectedHome: action.payload,
      };
    case JOIN_HOME:
      const newHome = action.payload;

      return {
        all: state.all ? [...state.all, newHome] : [newHome],
        selectedHome: newHome,
      };
    case UPDATE_HOME:
      const updatedHome = action.payload;
      let all = state.all || [];

      const foundIndex = all.findIndex((home) => home._id === updatedHome._id);
      if (foundIndex) {
        all[foundIndex] = updatedHome;
      } else {
        all.push(updatedHome);
      }

      let newSelectedHome = state.selectedHome;
      if (newSelectedHome._id === updatedHome._id) {
        newSelectedHome = updatedHome;
      }

      return {
        all,
        newSelectedHome,
      };
    case CLEAR_HOME_DATA:
      return {
        all: [],
        newSelectedHome: null,
      };
    default:
      return state;
  }
};
