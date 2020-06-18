import AsyncStorage from '@react-native-community/async-storage';
import isEmail from 'validator/lib/isEmail';

import authApi from '../api/auth';
import { setCurrentUser, clearCurrentUser } from '../redux/actions';
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
  };

  signIn = async (email, password, dispatch) => {
    const data = await authApi.signIn(email, password);
    this.setUser(data, dispatch);
  };

  signOut = async (dispatch) => {
    authApi.signOut();
    dispatch(clearCurrentUser());
    AsyncStorage.removeItem(STORED_USER_KEY);
  };

  // Helpers
  setUser = (data, dispatch) => {
    const jsonValue = JSON.stringify(data);
    AsyncStorage.setItem(STORED_USER_KEY, jsonValue);
    dispatch(setCurrentUser(data));
  };
}

export default AuthService;
