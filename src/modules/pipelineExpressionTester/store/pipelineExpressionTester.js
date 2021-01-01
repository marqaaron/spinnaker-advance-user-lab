import api from "@/core/utilities/api";
import log from "@/core/utilities/log";
import {applications,applicationPipelineConfigs,applicationPipelineExecutions, successfulResults, failureResults} from "./mockData";
import gateEndpoints from "@/modules/pipelineExpressionTester/store/gateEndpoints";
import {appConfig} from "@/main";
import {envConfig} from "@/main";

export default {
    state: {
        applications: [],
        applicationsMockData: applications,
        applicationPipelineConfigs: [],
        applicationPipelineConfigsMockData: applicationPipelineConfigs,
        applicationPipelineExecutions: [],
        applicationPipelineExecutionsMockData: applicationPipelineExecutions,
        expressionEvaluationHistory: [],
        defaultExpressionEvaluation: {
            applicationName: '',
            pipelineName: '',
            pipelineId: '',
            expression: '',
            results: '',
            evaluationResult: ''
        },
        currentExpressionEvaluation: null,
        testerSection: 'current',
        currentTestViewer: 'execution',
        currentConfigViewer: 'settings',
        selectedExecutionElementData: null,
        selectedExecutionElementPathInsertMode: false
    },
    getters: {
        applications(state){
            return state.applications;
        },
        applicationsMockData(state){
            return state.applicationsMockData;
        },
        applicationPipelineConfigs(state){
            return state.applicationPipelineConfigs;
        },
        applicationPipelineConfigsMockData(state){
            return state.applicationPipelineConfigsMockData;
        },
        applicationPipelineExecutions(state){
            return state.applicationPipelineExecutions;
        },
        applicationPipelineExecutionsMockData(state){
            return state.applicationPipelineExecutionsMockData;
        },
        expressionEvaluationHistory(state){
            return state.expressionEvaluationHistory;
        },
        defaultExpressionEvaluation(state){
            return {...state.defaultExpressionEvaluation};
        },
        currentExpressionEvaluation(state){
            return state.currentExpressionEvaluation;
        },
        testerSection(state){
            return state.testerSection;
        },
        currentTestViewer(state){
            return state.currentTestViewer;
        },
        currentConfigViewer(state){
            return state.currentConfigViewer;
        },
        selectedExecutionElementData(state){
            return state.selectedExecutionElementData;
        },
        selectedExecutionElementPathInsertMode(state){
            return state.selectedExecutionElementPathInsertMode;
        }
    },
    actions: {
        getApplications({commit,getters},payload){
            return new Promise ((resolve,reject)=>{
                if(envConfig.NODE_ENV !== 'development'){
                    log.text("Requesting Applications");
                    api.get(gateEndpoints.applicationsUrl(appConfig)).then(
                        (response)=>{
                            if(gateEndpoints.sessionValid(response)){
                                log.text("Applications successfully retrieved");
                                commit("setApplications",response.data);
                                resolve(true);
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
                        resolve(true);
                    },1000);
                }
            })
        },
        getApplicationPipelineConfigs({commit,getters},payload){
            return new Promise ((resolve,reject)=>{
                if(envConfig.NODE_ENV !== 'development'){
                    log.text("Requesting Pipeline Configs");
                    api.get(gateEndpoints.pipelineConfigsUrl(appConfig,payload)).then(
                        (response)=>{
                            if(gateEndpoints.sessionValid(response)){
                                log.text("Pipeline Configs successfully retrieved");
                                commit("setApplicationPipelineConfigs",response.data);
                                resolve(true);
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
                    commit("setApplicationPipelineConfigs",getters.applicationPipelineConfigsMockData);
                    setTimeout(()=>{
                        resolve(true);
                    },1000);
                }
            })
        },
        getApplicationPipelineExecutions({commit,getters},payload){
            return new Promise ((resolve,reject)=>{
                if(envConfig.NODE_ENV !== 'development'){
                    log.text("Requesting Pipeline Executions");
                    api.get(gateEndpoints.pipelineExecutionsUrl(appConfig,payload)).then(
                        (response)=>{
                            if(gateEndpoints.sessionValid(response)){
                                log.text("Pipeline Executions successfully retrieved");
                                commit("setApplicationPipelineExecutions",response.data);
                                resolve(true);
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
                    commit("setApplicationPipelineExecutions",getters.applicationPipelineExecutionsMockData);
                    setTimeout(()=>{
                        resolve(true);
                    },1000);
                }
            })
        },
        evaluateExpression({commit,getters},payload){
            return new Promise ((resolve,reject)=>{
                let test = payload;
                let requestExpression =  '${ ' + payload.expression  + ' }';
                if(envConfig.NODE_ENV !== 'development'){
                    log.text("Requesting Expression Evaluation");
                    let requestConfig = {
                        headers: {
                            'Content-type': 'text/plain'
                        }
                    };
                    api.post(gateEndpoints.evaluateExpressionUrl(appConfig,payload.pipelineId),requestExpression,requestConfig).then(
                        (response)=>{
                            if(gateEndpoints.sessionValid(response)){
                                log.text("Evaluate Expression successfully retrieved");
                                if(response.data.detail){
                                    test.evaluationResult = 'Failed';
                                    test.results = response.data.detail[payload.expression][0];
                                } else {
                                    test.evaluationResult = 'Successful';
                                    test.results = response.data.result;
                                }
                                commit("setCurrentExpressionEvaluation",test);
                                commit("addExpressionEvaluationToHistory",test);
                                resolve(true);
                            } else {
                                resolve(false);
                            }
                        },
                        (error)=>{
                            log.obj("Evaluate Expression Request Error",error);
                            reject(api.error(error));
                        }
                    )
                } else {
                    log.text("Setting Expression Evaluation to Random Result");

                    if(getters.expressionEvaluationHistory.length % 2 === 0){
                        test.evaluationResult = 'Successful';
                        test.results = successfulResults ;
                    } else {
                        test.evaluationResult = 'Failed';
                        test.results = failureResults ;
                    }
                    commit("setCurrentExpressionEvaluation",test);
                    commit("addExpressionEvaluationToHistory",test);

                    setTimeout(()=>{
                        resolve(true);
                    },1000);
                }

            })
        },
        setCurrentExpressionEvaluation(context,payload){
            context.commit("setCurrentExpressionEvaluation",payload);
        },
        resetCurrentExpressionEvaluation({commit,getters},payload){
            let newEvaluation = getters.defaultExpressionEvaluation;
            commit("setCurrentExpressionEvaluation",newEvaluation);
        },
        setTesterSection(context,payload){
            context.commit("setTesterSection",payload);
        },
        setCurrentTestViewer(context,payload){
            context.commit("setCurrentTestViewer",payload);
        },
        setCurrentConfigViewer(context,payload){
            context.commit("setCurrentConfigViewer",payload);
        },
        setSelectedExecutionElementData(context,payload){
            context.commit("setSelectedExecutionElementData",payload);
        },
        setSelectedExecutionElementPathInsertMode(context,payload){
            context.commit("setSelectedExecutionElementPathInsertMode",payload);
        },
        reloadTest(context,payload){
            context.commit("setCurrentExpressionEvaluation",payload);
            context.commit("setTesterSection",'current');
            context.commit("setCurrentTestViewer",'results');
        }
    },
    mutations: {
        setApplications(state,payload){
            state.applications = payload;
        },
        setApplicationPipelineConfigs(state,payload){
            state.applicationPipelineConfigs = payload;
        },
        setApplicationPipelineExecutions(state,payload){
            state.applicationPipelineExecutions = payload;
        },
        setCurrentExpressionEvaluation(state,payload){
            state.currentExpressionEvaluation = payload;
        },
        addExpressionEvaluationToHistory(state,payload){
            state.expressionEvaluationHistory.push({...payload});
        },
        setTesterSection(state,payload){
            state.testerSection = payload;
        },
        setCurrentTestViewer(state,payload){
            state.currentTestViewer = payload;
        },
        setCurrentConfigViewer(state,payload){
            state.currentConfigViewer = payload;
        },
        setSelectedExecutionElementData(state,payload){
            state.selectedExecutionElementData = payload;
        },
        setSelectedExecutionElementPathInsertMode(state,payload){
            state.selectedExecutionElementPathInsertMode = payload;
        }
    }
}
