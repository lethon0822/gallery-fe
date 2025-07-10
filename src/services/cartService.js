import axios from './httpRequester';
axios.defaults.baseURL = '/api/v1';

export const addItem = (itemId) => {
  return axios.post('/cart', { itemId }).catch(e => e.response);
};

export const getItems = () => {
  return axios.get('/cart').catch((e) => e.response);
};

export const removeItem = (cartId) => {
  return axios.delete(`/cart/${cartId}`).catch(e => e.response);
};

export const removeAll = () => {
  return axios.delete('/cart').catch(e => e.response)
}
