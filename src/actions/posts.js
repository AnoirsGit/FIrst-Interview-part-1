import * as api from '../api';


api.fetchPosts()

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch ({ type: 'FETCH', payload: data});
    } catch (error) {
        console.log(error)
    }
}

export const createPosts = (put) => async (dispatch) => {
    try {
        const { data } = await api.createPosts(put);
        dispatch ({ type: 'CREATE', payload: data});
    } catch (error) {
        console.log(error)
    }
}