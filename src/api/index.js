import axios from 'axios';

const url = 'https://kavooo.herokuapp.com/posts';

export const fetchPosts = () => axios.get(url);
export const createPosts = (data) => axios.post(url, data);