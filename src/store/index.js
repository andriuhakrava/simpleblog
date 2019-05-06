import Vue from 'vue';
import Vuex from 'vuex';

import loading from './modules/loading';
import error from './modules/error';
import auth from './modules/auth';
import token from './modules/token';
import users from './modules/users';
import posts from './modules/posts';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    loading,
    error,
    auth,
    token,
    users,
    posts,
  },
});
