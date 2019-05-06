import axios from 'axios';

const state = {
  usersList: '',
};

const getters = {
  usersList(state) {
    return state.usersList;
  },
};

const mutations = {
  setUsersList(state, payload) {
    state.usersList = payload;
  },
};

const actions = {
  getUsers({ commit, dispatch }) {
    dispatch('manageLoading', true);
    dispatch('manageError', null);
    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem('jwt')}`,
        'Content-Type': 'multipart/form-data',
      },
    };
    axios.get('/users-list/', config).then((response) => {
      dispatch('manageLoading', false);
      commit('setUsersList', response.data);
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
