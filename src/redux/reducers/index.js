import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import alertReducer from './alert-reducer';
import homeReducer from './home-reducer';

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  homes: homeReducer,
});
