import axios from 'axios';
import config from '../config';

const createApiInstance = () => (
  axios.create({
    // baseURL: config.apiPath,
    baseURL: '/api',
    headers: {
      'x-access-token': window.localStorage.getItem('ywc15Token') || ''
    }
  })
);

const handleResponse = (response) => {
  if (response.data) {
    return Promise.resolve(response);
  }
  return Promise.reject(response);
};

const catchError = e => Promise.reject(e.response.data);

export default {
  get: path => (
    createApiInstance()
      .get(path)
      .then(handleResponse)
      .catch(catchError)
  ),
  post: (path, body = {}, headers = {}) => (
    createApiInstance()
      .request({
        url: path,
        method: 'POST',
        headers,
        data: body,
      })
      .then(handleResponse)
      .catch(catchError)
  ),
  put: (path, body = {}) => (
    createApiInstance()
      .request({
        url: path,
        method: 'PUT',
        data: body,
      })
      .then(handleResponse)
      .catch(catchError)
  ),
};
