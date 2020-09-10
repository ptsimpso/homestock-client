import {
  SET_HOMES,
  SELECT_HOME,
  JOIN_HOME,
  UPDATE_HOME,
  CLEAR_HOME_DATA,
  LEAVE_HOME,
} from '../actions/types';

const INITIAL_STATE = {
  all: null,
  selectedHome: null,
};

const sortItems = (items) => {
  return items.sort((a, b) => {
    const aNeedsRestock = a.quantity <= a.restockThreshold;
    const bNeedsRestock = b.quantity <= b.restockThreshold;

    if (aNeedsRestock === bNeedsRestock) {
      return a.name < b.name ? -1 : 1;
    }
    if (aNeedsRestock) {
      return -1;
    }
    return 1;
  });
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

      if (!selectedHome && homes && homes.length > 0) {
        selectedHome = homes[0];
      }
      sortItems(selectedHome.items);

      return {
        all: homes,
        selectedHome,
      };
    case SELECT_HOME:
      const home = action.payload;
      sortItems(home.items);
      return {
        ...state,
        selectedHome: home,
      };
    case JOIN_HOME:
      const newHome = action.payload;
      sortItems(newHome.items);

      return {
        all: state.all ? [...state.all, newHome] : [newHome],
        selectedHome: newHome,
      };
    case LEAVE_HOME:
      const id = action.payload;
      const homesLeft = state.all.filter((home) => {
        return home._id !== id;
      });

      return {
        all: homesLeft,
        selectedHome:
          homesLeft && homesLeft.length > 0 ? homesLeft[0] : undefined,
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
      sortItems(newSelectedHome.items);

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
