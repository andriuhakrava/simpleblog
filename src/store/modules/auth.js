import axios from 'axios';
import router from '../../router';

const state = {
  authenticatedUser: '',
};

const getters = {
  authenticatedUser(state) {
    return state.authenticatedUser;
  },
};

const mutations = {
  setUsername(state, payload) {
    state.authenticatedUser = payload;
  },
};

const actions = {
  manageUser({ commit }, payload) {
    localStorage.setItem('jwt', payload.token);
    localStorage.setItem('orig_iat', payload.token);
    localStorage.setItem('user', payload.user.pk);
    localStorage.setItem('username', payload.user.username);
    commit('setToken', {
      token: payload.token,
    });
    commit('setUsername', localStorage.getItem('username'));
    router.push('/');
  },
  clearStore({ commit, dispatch }) {
    dispatch('manageError', null);
    commit('setUsername', null);
    commit('setToken', { token: null });
    commit('setPostsList', null);
    commit('setUsersList', null);
  },
  registerUser({ commit, dispatch }, payload) {
    dispatch('manageLoading', true);
    dispatch('manageError', null);
    axios.post('/rest-auth/registration/', payload)
      .then((response) => {
        dispatch('manageLoading', false);
        dispatch('manageUser', response.data);
      })
      .catch((error) => {
        dispatch('manageLoading', false);
        dispatch('manageError', error);
        if (error.request.status === 400) {
          commit('setErrorMessage', JSON.parse(error.request.responseText));
        }
      });
  },
  loginUser({ commit, dispatch }, payload) {
    dispatch('manageLoading', true);
    dispatch('manageError', null);
    axios.post('/rest-auth/login/', payload)
      .then((response) => {
        dispatch('manageLoading', false);
        dispatch('manageUser', response.data);
      })
      .catch((error) => {
        dispatch('manageLoading', false);
        dispatch('manageError', error);
        if (error.response.status === 400) {
          commit('setErrorMessage', JSON.parse(error.response.request.responseText));
        }
      });
  },
  logoutUser({ dispatch }) {
    localStorage.clear();
    dispatch('clearStore');
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
