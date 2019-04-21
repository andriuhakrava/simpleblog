import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'
import axios from 'axios'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate);

axios.defaults.baseURL = 'https://api-test-vuejs.herokuapp.com/api/v1';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
