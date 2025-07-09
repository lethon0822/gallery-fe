import axios from 'axios';
axios.defaults.baseURL = '/api/v1';

export const addItem = itemId => {
    return axios.post('/cart', {itemId}).catch(e => e.response);
}

export const getItems = () => {
    return axios.get('/cart').catch(e => e.response);
}