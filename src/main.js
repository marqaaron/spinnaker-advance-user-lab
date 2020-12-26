import Vue from 'vue';

// IMPORT & APPLY VUE COMPONENTS
import {baseMain} from "@/core/baseMain";
baseMain();

import '@/customize-styles.scss';

// INITIALIZE ROUTER
import VueRouter from 'vue-router';
import {baseRoutes} from "@/core/routes/routes";
Vue.use(VueRouter);
export const routes = baseRoutes;
const router = new VueRouter({
  routes: routes,
  base: (typeof process.env.VUE_APP_APP_PATH !== 'undefined') ? '/' + process.env.VUE_APP_APP_PATH + '/' : '/',
  mode: 'history'
});


// INITIALIZE VUEX STORE AND MODULES
import Vuex from 'vuex';
import vuexModules from "@/modules/vuexModules";
Vue.use(Vuex);
const vuexConfig = {
  modules: vuexModules,
  state: {}
}
export const store = new Vuex.Store(vuexConfig);


// INITIALIZE APP
import App from '@/App.vue';

new Vue({
  el: '#app',
  render: h => h(App),
  router: router,
  store: store
});
