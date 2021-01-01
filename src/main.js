import Vue from 'vue';

// IMPORT & APPLY VUE COMPONENTS
import {baseMain} from "@/core/baseMain";
baseMain();

import '@/customize-styles.scss';

export const appConfig = window.__env;
export const envConfig = process.env;

// INITIALIZE ROUTER
import VueRouter from 'vue-router';
import {baseRoutes} from "@/core/routes/routes";
Vue.use(VueRouter);
export const routes = baseRoutes;
const router = new VueRouter({
  routes: routes,
  base: envConfig.BASE_URL,
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
