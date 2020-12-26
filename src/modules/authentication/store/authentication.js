import api from "@/core/utilities/api";
import log from "@/core/utilities/log";
import gateEndpoints from "@/modules/authentication/store/gateEndpoints";

const config = process.env;

export default {
    state: {
        isLoggedIn: false,
        invalidSessionAlertActive: false,
        details: null,
        enabled: config.VUE_APP_AUTHENTICATION_ENABLED === 'true'
    },
    getters: {
        isLoggedIn(state,getters,rootState) {
            return state.isLoggedIn;
        },
        details(state,getters,rootState){
            return state.details;
        },
        authenticationEnabled(state,getters,rootState){
            return state.enabled;
        },
        invalidSessionAlertActive(state,getters,rootState){
            return state.invalidSessionAlertActive;
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
            return new Promise( (resolve,reject) => {
                log.text("Requesting Login from " + config.VUE_APP_ENDPOINT_LOGIN);
                api.post(
                    config.VUE_APP_ENDPOINT_LOGIN,
                    payload
                ).then(
                    (response) => {
                        log.text("Login successful");
                        commit("toggleIsLoggedIn",true);
                        commit("setUserDetails",response.data);
                        resolve(true);
                    },
                    (error) => {
                        log.obj("Login Request Error",error);
                        reject(api.error(error));
                    }
                );
            })
        },
        requestUser({commit,getters},payload){
            return new Promise( (resolve,reject) => {
                log.text("Requesting User from " + gateEndpoints.userDetailsUrl(config));
                api.get(
                    gateEndpoints.userDetailsUrl(config)
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
            })
        },
        logout(context,payload){
            return new Promise((resolve,reject)=>{
                log.text("Requesting Logout from " + gateEndpoints.logOutUrl(config));
                api.get(
                    gateEndpoints.logOutUrl(config)
                ).then(
                    (response) => {
                        log.text("Logout Request successful");
                        context.commit("setUserDetails",false);
                        context.commit("toggleIsLoggedIn",false);
                        resolve(true);
                    },
                    (error) => {
                        log.obj("Login Request Error",error);
                        reject(api.error(error));
                    }
                );
            })
        },
        requestEmailReminder({commit,getters},payload){
            return new Promise((resolve,reject) => {
                log.text("Requesting Email Reminder from " + config.VUE_APP_ENDPOINT_FORGOT_EMAIL);
                api.post(
                    config.VUE_APP_ENDPOINT_FORGOT_EMAIL,
                    payload
                ).then(
                    (response) => {
                        log.text("Forgot Email request received successfully");
                        resolve(true);
                    },
                    (error) => {
                        log.obj("Forgot Email Request Error",error);
                        reject(api.error(error));
                    }
                )
            })
        },
        requestPasswordReset({commit,getters},payload){
            return new Promise((resolve,reject) => {
                log.text("Requesting Password Reset from " + config.VUE_APP_ENDPOINT_PASSWORD_RESET_REQUEST);
                api.post(
                    config.VUE_APP_ENDPOINT_PASSWORD_RESET_REQUEST,
                    payload
                ).then(
                    (response) => {
                        log.text("Password Reset request received successfully");
                        resolve(true);
                    },
                    (error) => {
                        log.obj("Password Reset Request Error",error);
                        reject(api.error(error));
                    }
                )
            })
        },
        validatePasswordResetToken({commit,getters},payload){
            return new Promise((resolve,reject) => {
                log.text("Validating Password Reset Token from " + config.VUE_APP_ENDPOINT_VALIDATE_PASSWORD_RESET_TOKEN);
                api.post(
                    config.VUE_APP_ENDPOINT_VALIDATE_PASSWORD_RESET_TOKEN,
                    payload
                ).then(
                    (response) => {
                        log.text("Password Reset Token Validation request received successfully");
                        resolve(true);
                    },
                    (error) => {
                        log.obj("Password Reset Token Validation Request Error",error);
                        reject(api.error(error));
                    }
                )
            })
        },
        setAuthenticationEnabled(context,payload){
            context.commit('setAuthenticationEnabled',payload);
        },
        resetPassword({commit,getters},payload) {
            return new Promise((resolve, reject) => {
                log.text("Resetting Password from " + config.VUE_APP_ENDPOINT_RESET_PASSWORD);
                api.post(
                    config.VUE_APP_ENDPOINT_RESET_PASSWORD,
                    payload
                ).then(
                    (response) => {
                        log.text("Password Reset received successfully");
                        resolve(true);
                    },
                    (error) => {
                        log.obj("Password Reset Request Error", error);
                        reject(api.error(error));
                    }
                )
            })
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
