import AsyncStorage from '@react-native-community/async-storage';
import isEmail from 'validator/lib/isEmail';

import authApi from '../api/auth';
import { setCurrentUser, clearCurrentUser, setHomes } from '../redux/actions';
import { STORED_USER_KEY } from '../utils/constants';

class AuthService {
  constructor() {}

  signUp = async (name, email, password, dispatch) => {
    if (name === '' || email === '' || password === '') {
      throw new Error('Please fill in all fields.');
    }

    if (!isEmail(email)) {
      throw new Error('Please provide a valid email.');
    }

    const data = await authApi.signUp(
      name.trim(),
      email.trim(),
      password.trim()
    );
    this.setUser(data, dispatch);
    dispatch(setHomes([]));
  };

  signIn = async (email, password, dispatch) => {
    const data = await authApi.signIn(email.trim(), password.trim());
    this.setUser(data, dispatch);
  };

  signOut = async (dispatch) => {
    authApi.signOut();
    dispatch(clearCurrentUser());
    AsyncStorage.removeItem(STORED_USER_KEY);
  };

  sendForgotPass = async (email) => {
    if (!isEmail(email)) {
      throw new Error('Please provide a valid email.');
    }

    await authApi.resetPassword(email.trim());
  };

  updateUser = async (authToken, updates, dispatch) => {
    const data = await authApi.updateUser(updates);
    this.setUser({ user: data, token: authToken }, dispatch);
  };

  loadUserFromStorage = async (dispatch) => {
    const json = await AsyncStorage.getItem(STORED_USER_KEY);
    let isLoggedIn;
    if (json) {
      const data = JSON.parse(json);
      dispatch(setCurrentUser(data));
      isLoggedIn = true;
    } else {
      dispatch(clearCurrentUser());
      isLoggedIn = false;
    }
    return isLoggedIn;
  };

  // Helpers
  setUser = (data, dispatch) => {
    const jsonValue = JSON.stringify(data);
    AsyncStorage.setItem(STORED_USER_KEY, jsonValue);
    dispatch(setCurrentUser(data));
  };
}

export default AuthService;
