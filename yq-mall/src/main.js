import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from "axios";
import store from './store'


Vue.prototype.$axios = axios;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
