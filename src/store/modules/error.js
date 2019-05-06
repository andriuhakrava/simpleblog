const state = {
  error: null,
  errorMessage: '',
};

const getters = {
  errorMessage(state) {
    return state.errorMessage;
  },
};

const mutations = {
  setError(state, payload) {
    state.error = payload;
  },
  setErrorMessage(state, payload) {
    state.errorMessage = payload;
  },
};

const actions = {
  manageError({ commit }, payload) {
    commit('setError', payload);
    commit('setErrorMessage', payload);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
