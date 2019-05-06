const state = {
  loading: null,
};

const getters = {
  loading(state) {
    return state.loading;
  },
};

const mutations = {
  setLoading(state, payload) {
    state.loading = payload;
  },
};

const actions = {
  manageLoading({ commit }, payload) {
    commit('setLoading', payload);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
