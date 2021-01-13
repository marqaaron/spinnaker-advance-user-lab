import {envConfig} from "@/main";
import api from "@/core/utilities/api";
import log from "@/core/utilities/log";
import {applications,applicationPipelineConfigs,applicationPipelineExecutions, successfulResults, failureResults} from "./mockData";
import gateEndpoints from "./gateEndpoints";


export default {
    state: {
        pipelinesInsightsApplications: [],
    },
    getters: {
        pipelinesInsightsApplications(state){
            return state.pipelinesInsightsApplications;
        }
    },
    actions: {
        setPipelinesInsightsApplications(context,payload){
            context.commit("setPipelinesInsightsApplications",payload);
        }
    },
    mutations: {
        setPipelinesInsightsApplications(state,payload){
            state.pipelinesInsightsApplications = payload;
        },
    }
}
