import log from "@/core/utilities/log";

export default {
    state: {
        appConfig: null
    },
    getters: {
        appConfig(state){
            return state.appConfig;
        }
    },
    actions: {
        setAppConfig(context,payload){
            log.obj('App Config',payload);
            context.commit("setAppConfig",payload);
        }
    },
    mutations: {
        setAppConfig(state,payload){
            state.appConfig = payload;
        }
    }
}
