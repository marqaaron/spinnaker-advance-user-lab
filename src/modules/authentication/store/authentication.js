import api from "@/core/utilities/api";
import log from "@/core/utilities/log";
import gateEndpoints from "@/modules/authentication/store/gateEndpoints";
import {user} from "@/modules/authentication/store/mockData";

const envConfig = process.env;

export default {
    state: {
        isLoggedIn: false,
        invalidSessionAlertActive: false,
        details: null,
    },
    getters: {
        isLoggedIn(state,getters,rootState) {
            return state.isLoggedIn;
        },
        details(state,getters,rootState){
            return state.details;
        },
        invalidSessionAlertActive(state,getters,rootState){
            return state.invalidSessionAlertActive;
        },
        currentUserRoles(state,getters,rootState){
            if(state.details){
                return state.details.roles;
            } else {
                return null;
            }
        }
    },
    actions: {
        setIsLoggedIn(context,payload){
            context.commit("setIsLoggedIn",payload);
        },
        setInvalidSessionAlertActive(context,payload){
            context.commit("setInvalidSessionAlertActive",payload);
        },
        logIn({commit,getters},payload){
            if(envConfig.NODE_ENV !== 'development'){
                window.open(gateEndpoints.loginRedirectUrl(getters.appConfig,envConfig),'_self');
            } else {
                return new Promise( (resolve,reject) => {
                    log.text("Logging in locally");
                    setTimeout(()=>{
                        commit("toggleIsLoggedIn",true);
                        commit("setUserDetails",user);
                        resolve(true);
                    },1000);
                })
            }
        },
        requestUser({commit,getters},payload){
            return new Promise( (resolve,reject) => {
                if(envConfig.NODE_ENV !== 'development'){
                    log.text("Requesting User from " + gateEndpoints.userDetailsUrl(getters.appConfig));
                    api.get(
                        gateEndpoints.userDetailsUrl(getters.appConfig)
                    ).then(
                        (response) => {
                            log.text("User Details Request successful");
                            if(typeof response.data.email !== 'undefined'){
                                commit("toggleIsLoggedIn",true);
                                commit("setUserDetails",response.data);
                                resolve(true);
                            } else {
                                resolve(false);
                            }
                        },
                        (error) => {
                            log.obj("Login Request Error",error);
                            reject(api.error(error));
                        }
                    );
                } else {
                    log.text("User Details Request skipped in Dev Environment");
                    setTimeout(()=>{
                        resolve(true);
                    },1000);
                }

            })
        },
        logout({commit,getters},payload){
            return new Promise((resolve,reject)=>{
                if(envConfig.NODE_ENV !== 'development'){
                    log.text("Requesting Logout from " + gateEndpoints.logOutUrl(getters.appConfig));
                    api.get(
                        gateEndpoints.logOutUrl(getters.appConfig)
                    ).then(
                        (response) => {
                            log.text("Logout Request successful");
                            commit("setUserDetails",false);
                            commit("toggleIsLoggedIn",false);
                            resolve(true);
                        },
                        (error) => {
                            log.obj("Logout Request Error",error);
                            reject(api.error(error));
                        }
                    );
                } else {
                    log.text("Logging out locally");
                    setTimeout(()=>{
                        commit("setUserDetails",false);
                        commit("toggleIsLoggedIn",false);
                        resolve(true);
                    },1000);
                }
            })
        },
        setAuthenticationEnabled(context,payload){
            context.commit('setAuthenticationEnabled',payload);
        }
    },
    mutations: {
        setIsLoggedIn(state,payload){
            state.isLoggedIn = payload;
        },
        toggleIsLoggedIn(state, payload) {
            if(payload != null){
                state.isLoggedIn = payload;
            } else {
                state.isLoggedIn = !state.isLoggedIn;
            }
        },
        setUserDetails(state,payload){
            if(payload.password){
                delete payload.password;
            }
            state.details = payload;
        },
        setAuthenticationEnabled(state,payload){
            state.enabled = payload;
        },
        setInvalidSessionAlertActive(state,payload){
            state.invalidSessionAlertActive = payload;
        }
    }
}
