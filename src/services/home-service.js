import AsyncStorage from '@react-native-community/async-storage';

import { STORED_SELECTED_HOME_KEY } from '../utils/constants';
import homeApi from '../api/home';
import {
  setHomes,
  joinHome,
  selectHome,
  updateHome,
  clearHomeData,
  leaveHome,
} from '../redux/actions';
import store from '../redux/store';

class HomeService {
  constructor() {}

  fetchHomes = async (dispatch) => {
    const data = await homeApi.fetchHomes();
    dispatch(setHomes(data));
  };

  createHome = async (name, joinCode, dispatch) => {
    if (!name || name === '' || !joinCode || joinCode === '') {
      throw new Error('Please provide a name and join code.');
    }

    const home = await homeApi.createHome(name, joinCode);
    dispatch(joinHome(home));
    this.saveSelectedHome(home._id);
  };

  joinHome = async (joinCode, dispatch) => {
    if (!joinCode || joinCode === '') {
      throw new Error('Please provide a join code.');
    }

    const home = await homeApi.joinHome(joinCode);
    dispatch(joinHome(home));
    this.saveSelectedHome(home._id);
  };

  leaveHome = async (id, dispatch) => {
    if (!id || id === '') {
      throw new Error('Please provide a home ID.');
    }

    await homeApi.leaveHome(id);
    dispatch(leaveHome(id));
  };

  selectHome = async (home, dispatch) => {
    dispatch(selectHome(home));
    this.saveSelectedHome(home._id);
  };

  updateHome = async (updatedHome, dispatch) => {
    dispatch(updateHome(updatedHome));
  };

  clearHomeData = (dispatch) => {
    dispatch(clearHomeData());
  };

  loadSelectedHomeFromStorage = async (dispatch) => {
    const id = await AsyncStorage.getItem(STORED_SELECTED_HOME_KEY);
    if (id) {
      const {
        homes: { all: allHomes },
      } = store.getState();

      if (allHomes && allHomes.length > 0) {
        let selectedHome;
        for (const home of allHomes) {
          if (home._id === id) {
            selectedHome = home;
            break;
          }
        }

        if (selectedHome) {
          dispatch(selectHome(selectedHome));
        }
      }
    }
  };

  // Helpers
  saveSelectedHome = (id) => {
    AsyncStorage.setItem(STORED_SELECTED_HOME_KEY, id);
  };
}

export default HomeService;
