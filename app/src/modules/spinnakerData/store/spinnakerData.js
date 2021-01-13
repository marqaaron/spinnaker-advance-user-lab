import {envConfig} from "@/main";
import api from "@/core/utilities/api";
import log from "@/core/utilities/log";
import {applications,applicationPipelineConfigs,applicationPipelineExecutions} from "./mockData";
import gateEndpoints from "./gateEndpoints";


export default {
    state: {
        applications: [],
    },
    getters: {
        applications(state){
            return state.applications;
        },
        applicationsMockData(state){
            return applications;
        },
        applicationPipelineConfigsMockData(state){
            return applicationPipelineConfigs;
        },
        applicationPipelineExecutionsMockData(state){
            return applicationPipelineExecutions;
        },
    },
    actions: {
        getApplications({commit,getters},payload){
            return new Promise ((resolve,reject)=>{
                if(envConfig.VUE_APP_SPINNAKER_HTTP_REQUESTS === 'enabled'){
                    log.text("Requesting Applications");
                    api.get(gateEndpoints.applicationsUrl(getters.appConfig)).then(
                        (response)=>{
                            if(gateEndpoints.sessionValid(response)){
                                log.text("Applications successfully retrieved");
                                commit("setApplications",response.data);
                                resolve(response.data);
                            } else {
                                resolve(false);
                            }
                        },
                        (error)=>{
                            log.obj("Applications Request Error",error);
                            reject(api.error(error));
                        }
                    )
                } else {
                    log.text("Setting Applications to MockData");
                    commit("setApplications",getters.applicationsMockData);
                    setTimeout(()=>{
                        resolve(getters.applicationsMockData);
                    },1000);
                }
            })
        },
        getApplicationPipelineConfigs({commit,getters},payload){
            return new Promise ((resolve,reject)=>{
                if(envConfig.VUE_APP_SPINNAKER_HTTP_REQUESTS === 'enabled'){
                    log.text("Requesting Pipeline Configs");
                    api.get(gateEndpoints.pipelineConfigsUrl(getters.appConfig,payload)).then(
                        (response)=>{
                            if(gateEndpoints.sessionValid(response)){
                                log.text("Pipeline Configs successfully retrieved");
                                resolve(response.data);
                            } else {
                                resolve(false);
                            }
                        },
                        (error)=>{
                            log.obj("Pipeline Configs Request Error",error);
                            reject(api.error(error));
                        }
                    )
                } else {
                    log.text("Setting Application Pipeline Configs to MockData");
                    setTimeout(()=>{
                        resolve(getters.applicationPipelineConfigsMockData);
                    },1000);
                }
            })
        },
        getApplicationPipelineExecutions({commit,getters},payload){
            return new Promise ((resolve,reject)=>{
                if(envConfig.VUE_APP_SPINNAKER_HTTP_REQUESTS === 'enabled'){
                    log.text("Requesting Pipeline Executions");
                    api.get(gateEndpoints.pipelineExecutionsUrl(getters.appConfig,payload)).then(
                        (response)=>{
                            if(gateEndpoints.sessionValid(response)){
                                log.text("Pipeline Executions successfully retrieved");
                                resolve(response.data);
                            } else {
                                resolve(false);
                            }
                        },
                        (error)=>{
                            log.obj("Pipeline Executions Request Error",error);
                            reject(api.error(error));
                        }
                    )
                } else {
                    log.text("Setting Application Pipeline Executions to MockData");
                    setTimeout(()=>{
                        resolve(getters.applicationPipelineExecutionsMockData);
                    },1000);
                }
            })
        },
    },
    mutations: {
        setApplications(state,payload){
            state.applications = payload;
        },
    }
}
