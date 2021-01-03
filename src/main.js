import Vue from 'vue';

// IMPORT & APPLY VUE COMPONENTS
import {baseMain} from "@/core/baseMain";
baseMain();

// IMPORT CUSTOM SCSS STYLING
import '@/customize-styles.scss';

// INITIALIZE VUEX STORE AND MODULES
import Vuex from 'vuex';
import vuexModules from "@/modules/vuexModules";
Vue.use(Vuex);
const vuexConfig = {
  modules: vuexModules,
  state: {}
}

// EXPORT STORE
export const store = new Vuex.Store(vuexConfig);

// EXPORT ENVIRONMENT CONFIG
export const envConfig = process.env;

// SET APP CONFIG IN STORE
store.dispatch('setAppConfig',{...window.__env});

// CLEAR INITIAL APP CONFIG INJECTOR
window.__env = null;


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

// INITIALIZE APP
import App from '@/App.vue';

new Vue({
  el: '#app',
  render: h => h(App),
  router: router,
  store: store
});
