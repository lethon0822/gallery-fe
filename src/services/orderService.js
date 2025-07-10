import axios from './httpRequester';

export const addOrder = args => {
  return axios.post('/order', args).catch(e => e.response)
}