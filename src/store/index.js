import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
    authenticatedUser: '',
    usersList: '',
    postsList: '',
    loading: null,
    error: null,
    errorMessage: '',
  },
  getters: {
    usersList(state) {
      return state.usersList;
    },
    postsList(state) {
      return state.postsList;
    },
    loading(state) {
      return state.loading;
    },
    errorMessage(state) {
      return state.errorMessage;
    },
    authenticatedUser(state) {
      return state.authenticatedUser;
    },
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload.token;
    },
    setUsername(state, payload) {
      state.authenticatedUser = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setErrorMessage(state, payload) {
      state.errorMessage = payload;
    },
    setUsersList(state, payload) {
      state.usersList = payload;
    },
    setPostsList(state, payload) {
      state.postsList = payload;
    },
    addPost(state, payload) {
      state.postsList.push(payload);
    },
  },
  actions: {
    manageLoading({ commit }, payload) {
      commit('setLoading', payload);
    },
    manageError({ commit }, payload) {
      commit('setError', payload);
      commit('setErrorMessage', payload);
    },
    manageUser({ commit }, payload) {
      localStorage.setItem('jwt', payload.token);
      localStorage.setItem('orig_iat', payload.token);
      localStorage.setItem('username', payload.user.username);
      commit('setToken', {
        token: payload.token,
      });
      commit('setUsername', localStorage.getItem('username'));
      router.push('/');
    },
    registerUser({ commit, state, dispatch }, payload) {
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
          if (state.error.request.status === 400) {
            commit('setErrorMessage', JSON.parse(state.error.request.responseText));
          }
        });
    },
    loginUser({ commit, state, dispatch }, payload) {
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
          if (state.error.response.status === 400) {
            commit('setErrorMessage', JSON.parse(state.error.response.request.responseText));
          }
        });
    },
    clearStore({ commit, dispatch }) {
      dispatch('manageError', null);
      commit('setUsername', null);
      commit('setToken', { token: null });
      commit('setPostsList', null);
      commit('setUsersList', null);
    },
    logoutUser({ dispatch }) {
      localStorage.clear();
      dispatch('clearStore');
    },
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
    verifyToken({ commit, dispatch, state }) {
      const currentToken = localStorage.getItem('jwt');
      if (!currentToken) return;
      axios.post('/api-token-verify/', { token: currentToken })
        .then((response) => {
          if (response.status === 200) {
            axios.post('/api-token-refresh/', { token: localStorage.getItem('orig_iat') })
              .then((newResponse) => {
                localStorage.setItem('jwt', newResponse.data.token);
              })
              .catch((error) => {
                localStorage.clear();
                commit('setUsername', false);
                dispatch('manageError', error);
                if (error.response.data.non_field_errors) {
                  commit('setErrorMessage', state.error.response.data.non_field_errors[0]);
                }
                router.push('/signin');
              });
          }
          return response;
        })
        .catch((error) => {
          localStorage.clear();
          dispatch('manageError', error);
          commit('setUsername', false);
          router.push('/signin');
        });
    },
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
        commit('manageLoading', false);
        commit('addPost', response.data);
        router.push('/');
      })
        .catch((error) => {
          dispatch('manageLoading', false);
          dispatch('manageError', error);
        });
    },
  },
});
