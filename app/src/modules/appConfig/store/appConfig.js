import log from "@/core/utilities/log";
import {envConfig} from "@/main";
import api from "@/core/utilities/api";
import gateEndpoints from "@/modules/pipelineExpressionTester/store/gateEndpoints";

export default {
    state: {
        appConfig: null,
        appConfigUnavailable: false
    },
    getters: {
        appConfig(state){
            return state.appConfig;
        },
        appConfigUnavailable(state){
            return state.appConfigUnavailable;
        }
    },
    actions: {
        setAppConfig(context,payload){
            context.commit("setAppConfig",payload);
        },
        setAppConfigUnavailable(context,payload){
            context.commit("setAppConfigUnavailable",payload);
        },
        getAppConfig({commit,getters},payload){
            return new Promise ((resolve,reject)=>{
                if(envConfig.NODE_ENV !== 'development'){
                    log.text("Setting AppConfig to window.__env");
                    setTimeout(()=>{
                        commit("setAppConfig", {...window.__env});
                        window.__env = null;
                        log.text(getters.appConfig)
                        resolve(true);
                    },1500);
                } else {
                    log.text("Setting AppConfig to window.__env");
                    setTimeout(()=>{
                        commit("setAppConfig", {...window.__env});
                        window.__env = null;
                        log.text(getters.appConfig)
                        resolve(true);
                        //reject(true);
                    },1500);
                }
            })
        },
    },
    mutations: {
        setAppConfig(state,payload){
            state.appConfig = payload;
        },
        setAppConfigUnavailable(state,payload){
            state.appConfigUnavailable = payload;
        }
    }
}
