import axios from 'axios';
import { DEV_MODE } from '../../utils/constants';

const createBase = () => {
  return axios.create({
    baseURL: DEV_MODE
      ? 'http://localhost:5000'
      : 'https://homestock-api.herokuapp.com',
    headers: {
      Authorization: '',
    },
  });
};

export default createBase;
