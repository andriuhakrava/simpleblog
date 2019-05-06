import axios from 'axios';
import router from '../../router';

const state = {
  token: '',
};

const mutations = {
  setToken(state, payload) {
    state.token = payload.token;
  },
};

const actions = {
  verifyToken({ commit, dispatch }) {
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
                commit('setErrorMessage', error.response.data.non_field_errors[0]);
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
};

export default {
  state,
  mutations,
  actions,
};
