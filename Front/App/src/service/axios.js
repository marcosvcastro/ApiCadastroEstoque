import axios from 'axios';
import { getBaseUrlApi } from '../config/Global';

// Default config options
const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
};

const instance = axios.create(defaultOptions);

instance.interceptors.request.use(async config => {
  let value = await instanceToken.get(`/values/getToken`);
  config.headers = {
    'Authorization': `Bearer ${value.data.access_token}`,
    'Accept': 'application/json'
  }

  config.baseURL = getBaseUrlApi();
  return config;

}, (error) => {
  return Promise.reject(error);
});

const instanceToken = axios.create(defaultOptions);

instanceToken.interceptors.request.use(async config => {
  config.baseURL = getBaseUrlApi();
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;
