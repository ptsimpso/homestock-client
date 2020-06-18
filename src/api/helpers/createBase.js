import axios from 'axios';

import { DEV_MODE } from '../../utils/constants';
import store from '../../redux/store';

const createBase = () => {
  const {
    auth: { token },
  } = store.getState();

  return axios.create({
    baseURL: DEV_MODE
      ? 'http://localhost:5000'
      : 'https://homestock-api.herokuapp.com',
    headers: {
      Authorization: token && token !== '' ? `Bearer ${token}` : '',
    },
  });
};

export default createBase;
