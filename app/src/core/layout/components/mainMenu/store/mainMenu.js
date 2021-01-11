import baseMenuItems from "@/core/layout/components/mainMenu/menuItems";
import baseMenuSettings from "@/core/layout/components/mainMenu/menuSettings";
import helpers from "@/core/utilities/helpers";

const menus = function(){
  let sortedMenus = [];
  sortedMenus = helpers.sortArrayBySingleObjProperty(baseMenuItems,'listPosition','ascending');
  return sortedMenus;
}

export default {
  state: {
    activeMenu: 'home',
    activeContent: 'homeItem1',
    isLoadingContent: false,
    settings: baseMenuSettings,
    menus: menus()
  },
  getters: {
    activeMenu(state,getters,rootState){
      return state.activeMenu;
    },
    activeContent(state,getters,rootState){
      return state.activeContent;
    },
    menus(state,getters,rootState){
      return state.menus;
    },
    isValidContent(state,getters,rootState){
      let menus = getters.menus;
      let items;
      let valid = false;
      menus.forEach(function(item,index){
        if(item.name === getters.activeMenu && !valid){
          items = item.items;
          items.forEach(function(link){
            if(link.name === getters.activeContent && !valid){
              valid = true;
            }
          })
        }
      })
      return valid;
    },
    redirects(state,getters,rootState){
      return {
        'login' : state.settings.loginRedirect,
        'logout' : state.settings.logoutRedirect
      };
    },
    isLoadingContent(state,getters,rootState){
      return state.isLoadingContent;
    },
    sidebarSettings(state,getters,rootState){
      return {
        title: state.settings.sidebarMainMenuName,
        position: state.settings.sidebarMainMenuRightPosition,
        text: state.settings.sidebarMainMenuTextVariant,
        background: state.settings.sidebarMainMenuBackgroundVariant,
        backdrop: state.settings.sidebarMainMenuBackdropEnabled,
        backdropVariant: state.settings.sidebarMainMenuBackdropVariant,
        shadow: state.settings.sidebarMainMenuShadowVariant
      }
    },
    sidebarMainMenuRightPosition(state,getters,rootState){
      return state.settings.sidebarMainMenuRightPosition;
    },
    menuSettings(state,getters,rootState){
      return state.settings;
    }
  },
  actions: {
    setActiveMenu(context,payload){
      context.commit("setActiveMenu",payload);
    },
    setActiveContent(context,payload){
      context.commit('setIsLoadingContent', true);
      context.commit("setActiveContent",payload);
      setTimeout(function(){
        context.commit('setIsLoadingContent', false);
      },context.state.settings.defaultLoadingTimeout);
    },
    setIsLoadingContent(context,payload){
      context.commit("setIsLoadingContent",payload);
    },
    setMenuSettings(context,payload){
      context.commit("setMenuSettings",payload);
    }
  },
  mutations: {
    setActiveMenu(state,payload){
      state.activeMenu = payload;
    },
    setActiveContent(state,payload){
      state.activeContent = payload;
    },
    setIsLoadingContent(state,payload){
      state.isLoadingContent = payload;
    },
    setMenuSettings(state,payload){
      state.settings = payload;
    }
  }
}
