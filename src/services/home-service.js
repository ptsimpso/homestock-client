import AsyncStorage from '@react-native-community/async-storage';

import { STORED_SELECTED_HOME_KEY } from '../utils/constants';
import homeApi from '../api/home';
import { setHomes, joinHome, selectHome, updateHome } from '../redux/actions';
import store from '../redux/store';
import home from '../api/home';

class HomeService {
  constructor() {}

  fetchHomes = async (dispatch) => {
    const data = await homeApi.fetchHomes();
    dispatch(setHomes(data));
  };

  joinHome = async (joinCode, dispatch) => {
    if (!joinCode || joinCode === '') {
      throw new Error('Please provide a join code.');
    }

    const home = await homeApi.joinHome(joinCode);
    dispatch(joinHome(home));
    this.saveSelectedHome(home._id);
  };

  selectHome = async (home, dispatch) => {
    dispatch(selectHome(home));
    this.saveSelectedHome(home._id);
  };

  updateHome = async (updatedHome, dispatch) => {
    dispatch(updateHome(updatedHome));
  }

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

        if (selectedHome) dispatch(selectHome(data));
      }
    }
  };

  // Helpers
  saveSelectedHome = (id) => {
    AsyncStorage.setItem(STORED_SELECTED_HOME_KEY, id);
  }

}

export default HomeService;
