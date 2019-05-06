import axios from 'axios';
import router from '../../router';

const state = {
  postsList: '',
};

const getters = {
  postsList(state) {
    return state.postsList;
  },
};

const mutations = {
  setPostsList(state, payload) {
    state.postsList = payload;
  },
  addPost(state, payload) {
    state.postsList.push(payload);
  },
};

const actions = {
  fetchPosts({ commit, dispatch }) {
    dispatch('manageLoading', true);
    dispatch('manageError', null);
    const config = { headers: { Authorization: `JWT ${localStorage.getItem('jwt')}` } };
    axios.get('/posts/', config).then((response) => {
      dispatch('manageLoading', false);
      commit('setPostsList', response.data);
    })
      .catch((error) => {
        dispatch('manageLoading', false);
        dispatch('manageError', error);
      });
  },
  createPost({ commit, dispatch }, payload) {
    dispatch('manageLoading', true);
    dispatch('manageError', null);
    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem('jwt')}`,
        'Content-Type': 'multipart/form-data',
      },
    };
    axios.post('/posts/', payload, config).then((response) => {
      dispatch('manageLoading', false);
      commit('addPost', response.data);
      router.push('/');
    })
      .catch((error) => {
        dispatch('manageLoading', false);
        dispatch('manageError', error);
      });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
