import api from "@/core/utilities/api";
import helpers from "@/core/utilities/helpers";
import log from "@/core/utilities/log";
import styles from "@/core/layout/styles";
import layoutSettings from "@/core/layout/layoutSettings";

const config = process.env;

export default {
  state: {
    windowWidth: window.innerWidth,
    isLoadingApp: true,
    activeCover: null,
    settings: layoutSettings,
    styles: styles
  },
  getters: {
    windowWidth(state,getters,rootState){
      return state.windowWidth;
    },
    isLoadingApp(state,getters,rootState){
      return state.isLoadingApp;
    },
    activeCover(state,getters,rootState){
      return state.activeCover;
    },
    activeCoverMessage(state,getters,rootState){
      if(state.activeCover != null){
        return state.settings.covers[state.activeCover];
      } else {
        return state.settings.covers['default'];
      }
    },
    minBrowserWidth(state,getters,rootState){
      return state.settings.minBrowserWidth;
    },
    pinMenu(state,getters,rootState){
      if(state.windowWidth >= getters.pinMenuBreakpoint){
        return state.settings.pinMenu;
      } else {
        return false;
      }
    },
    pinMenuBreakpoint(state,getters,rootState){
      return state.settings.pinMenuBreakpoint;
    },
    pinMenuWidth(state,getters,rootState){
      return helpers.toInt(state.styles.pinnedMainMenu.width);
    },
    mainContentAreaStyles(state,getters,rootState){
      let contentWidth;
      let pinMenuWidth = helpers.toInt(state.styles.pinnedMainMenu.width);
      if(state.settings.pinMenu && state.windowWidth >= getters.pinMenuBreakpoint){
        contentWidth = (state.windowWidth - pinMenuWidth) + 'px';
      } else {
        contentWidth = '100%';
      }
      let styles = state.styles.contentArea;
      styles.width = contentWidth;
      styles.marginTop = state.styles.navBar.height;
      if(state.settings.pinMenu && !getters.sidebarMainMenuRightPosition){
        styles.marginLeft = pinMenuWidth + 'px';
      } else {
        styles.marginLeft = 0;
      }
      return styles;
    },
    displayTooSmallWatchBreakpoint(state,getters,rootState){
      return state.settings.displayTooSmallWatchBreakpoint;
    },
    pinnedMainMenuStyles(state,getters,rootState){
      let styles = state.styles.pinnedMainMenu;
      styles.paddingTop = (helpers.toInt(state.styles.navBar.height) + 5) + 'px';
      if(getters.sidebarMainMenuRightPosition){
        if(typeof styles.left !== 'undefined'){
          delete styles.left;
        }
        styles.right = 0;
        styles.boxShadow = state.styles.pinnedMainMenuBoxShadowRight.boxShadow;
      } else {
        styles.left = 0;
        styles.boxShadow = state.styles.pinnedMainMenuBoxShadowLeft.boxShadow;
      }
      return styles;
    },
    navBarStyles(state,getters,rootState){
      return state.styles.navBar;
    },
    appName(state,getters,rootState){
      return state.settings.appName;
    },
    uiStyles(state,getters,rootState){
      return state.styles;
    },
    covers(state,getters,rootState){
      return state.settings.covers;
    },
    layoutConfig(state,getters,rootState){
      return state;
    },
    uiLayout(state,getters,rootState){
      return state.settings;
    }
  },
  actions: {
    setIsLoadingApp(context,payload){
      context.commit("setIsLoadingApp",payload);
    },
    setActiveCover(context, payload) {
      context.commit("setActiveCover",payload);
    },
    setPinMenu(context,payload){
      context.commit("setPinMenu",payload);
    },
    setWindowWidth(context,payload){
      context.commit("setWindowWidth",payload);
    },
    setPinMenuBreakpoint(context,payload){
      context.commit("setPinMenuBreakpoint",payload);
    },
    setMinBrowserWidth(context,payload){
      context.commit("setMinBrowserWidth",payload);
    },
    setDisplayTooSmallWatchWidth(context,payload){
      context.commit("setDisplayTooSmallWatchWidth",payload);
    },
    setAppName(context,payload){
      context.commit("setAppName",payload);
    },
    setCover(context,payload){
      context.commit("setCover",payload);
    },
    saveUIConfig({commit,getters},payload){
      return new Promise((resolve, reject) => {
        log.text("Sending Layout Config to " + config.VUE_APP_ENDPOINT_SAVE_UI_CONFIG);
        api.post(config.VUE_APP_ENDPOINT_SAVE_UI_CONFIG,getters.layoutConfig).then(
          (response) => {
            log.text("Layout Config successfully saved");
            resolve(true);
          },
          (error) => {
            log.obj("Layout Config Save Error",error);
            reject(api.error(error));
          }
        )
      })
    }
  },
  mutations: {
    setIsLoadingApp(state,payload){
      state.isLoadingApp = payload;
    },
    setActiveCover(state,payload){
      state.activeCover = payload;
    },
    setPinMenu(state,payload){
      state.settings.pinMenu = payload;
    },
    setWindowWidth(state,payload){
      state.windowWidth = payload;
    },
    setPinMenuBreakpoint(state,payload){
      state.settings.pinMenuBreakpoint = payload;
    },
    setMinBrowserWidth(state,payload){
      state.settings.minBrowserWidth = payload;
    },
    setDisplayTooSmallWatchWidth(state,payload){
      state.settings.displayTooSmallWatchBreakpoint = helpers.toInt(payload) + 80;
    },
    setAppName(state,payload){
      state.settings.appName = payload;
    },
    setCover(state,payload){
      state.settings.covers[payload.cover][payload.messageType] = payload.content;
    }
  }
}
