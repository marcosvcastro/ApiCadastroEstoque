import axios from './axios';

const list = () => axios.get(`/estoque/list`);
const saveOrUpdate = (estoque) => axios.post(`/estoque/saveOrUpdate`, estoque);
const exclude = (id) => axios.delete(`/estoque/delete/${id}`);
const searchId = (id) => axios.get(`/estoque/searchId/${id}`);

export default {
    list,
    saveOrUpdate,
    exclude,
    searchId
};  