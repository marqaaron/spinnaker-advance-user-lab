import Vue from 'vue';
import {baseMain} from "@/core/baseMain";
import '@/customize-styles.scss';
import Vuex from 'vuex';
import vuexModules from "@/modules/vuexModules";
import VueRouter from 'vue-router';
import {baseRoutes} from "@/core/routes/routes";
import App from '@/App.vue';

// APPLY VUE COMPONENTS
baseMain();

// EXPORT ENVIRONMENT CONFIG
export const envConfig = process.env;

// INITIALIZE VUEX STORE AND MODULES
Vue.use(Vuex);
const vuexConfig = {
  modules: vuexModules,
  state: {}
}

// EXPORT STORE
export const store = new Vuex.Store(vuexConfig);

// INITIALIZE ROUTER
Vue.use(VueRouter);
export const routes = baseRoutes;
const router = new VueRouter({
  routes: routes,
  base: envConfig.BASE_URL,
  mode: 'history'
});

// INITIALIZE APP
new Vue({
  el: '#app',
  render: h => h(App),
  router: router,
  store: store
});
