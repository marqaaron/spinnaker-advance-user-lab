import log from "@/core/utilities/log";
import {envConfig} from "@/main";
import api from "@/core/utilities/api";
import {appConfig as appConfigMockData} from "@/modules/appConfig/store/mockData";

export default {
    state: {
        appConfig: null,
        appConfigUnavailable: false,
        appConfigMockData: appConfigMockData
    },
    getters: {
        appConfig(state){
            return state.appConfig;
        },
        appConfigUnavailable(state){
            return state.appConfigUnavailable;
        },
        appConfigMockData(state){
            return state.appConfigMockData
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
                if(envConfig.VUE_APP_SAUL_APP_CONFIG === 'enabled'){
                    log.text("Requesting App Config");
                    api.get("/saul-api/config").then(
                        (response)=>{
                            setTimeout(()=>{
                                log.text("App Config successfully retrieved");
                                commit("setAppConfig",response.data)
                                resolve(true);
                            },1000)
                        },
                        (error)=>{
                            log.obj("Pipeline Executions Request Error",error);
                            reject(api.error(error));
                        }
                    )
                } else {
                    setTimeout(()=>{
                        log.text("Setting App Config to MockData");
                        commit("setAppConfig", {...getters.appConfigMockData});
                        window.__env = null;
                        resolve(true);
                    },1000);
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
