import {store} from "@/main";
import {
    enforceAuthentication,
    pullSaveUserDataFromLocalStorage,
    enforceAlreadyAuthenticated,
    redirectToLoginLocation,
    removeUserDataFromLocalStorage,
    enforceRBACByRole
} from "@/core/utilities/helpersAuth";
import NotFound from "@/core/routes/NotFound";
import Authentication from "@/modules/authentication/Authentication";
import ToolsView from "@/views/ToolsView";
import ReferenceView from "@/views/ReferenceView";
import AdminView from "@/views/AdminView";

const handleAuthenticationAndRbac = function(_routeDetails){
    if(store.getters.appConfig.AUTHENTICATION_ENABLED){
        pullSaveUserDataFromLocalStorage();
        if(_routeDetails.enforceAuthentication){
            enforceAuthentication(_routeDetails.next);
        }
        if(_routeDetails.enforceAlreadyLoggedIn){
            enforceAlreadyAuthenticated(_routeDetails.next);
        }
        if(_routeDetails.enforceRbacWithRole){
            enforceRBACByRole(_routeDetails.next,_routeDetails.from,_routeDetails.enforceRbacWithRole);
        }
    } else {
        removeUserDataFromLocalStorage();
    }
    _routeDetails.next();
}

const handleCustomLoginViewLogic = function(_next){
    if(store.getters.appConfig.AUTHENTICATION_ENABLED){
        pullSaveUserDataFromLocalStorage();
        if(store.getters.isLoggedIn){
            return _next(store.getters.redirects.login);
        } else {
            store.dispatch('requestUser').then(
                (response)=>{
                    if(response){
                        enforceAlreadyAuthenticated(_next);
                    } else {
                        return _next();
                    }
                },
                ()=>{
                    return _next();
                }
            )
        }
    } else {
        removeUserDataFromLocalStorage();
        redirectToLoginLocation(_next);
    }
    _next();
}

export const baseRoutes = [
    {
        path: '/tools/:activeContent?',
        name: 'viewTools',
        component: ToolsView,
        beforeEnter(to, from, next) {
            let routeDetails = {
                to: to,
                from: from,
                next: next,
                enforceAuthentication: true,
                enforceAlreadyLoggedIn: false,
                enforceRbacWithRole: null
            }
            if(store.getters.appConfig === null){
                store.dispatch("getAppConfig",true).then(
                    ()=>{
                        handleAuthenticationAndRbac(routeDetails);
                    },
                    ()=>{
                        store.dispatch('setActiveCover','missingAppConfig');
                    }
                )
            } else {
                handleAuthenticationAndRbac(routeDetails);
            }
        }
    },
    {
        path: '/references/:activeContent?',
        name: 'viewReference',
        component: ReferenceView,
        beforeEnter(to, from, next) {
            let routeDetails = {
                to: to,
                from: from,
                next: next,
                enforceAuthentication: true,
                enforceAlreadyLoggedIn: false,
                enforceRbacWithRole: null
            }
            if(store.getters.appConfig === null){
                store.dispatch("getAppConfig",true).then(
                    ()=>{
                        handleAuthenticationAndRbac(routeDetails);
                    },
                    ()=>{
                        store.dispatch('setActiveCover','missingAppConfig');
                    }
                )
            } else {
                handleAuthenticationAndRbac(routeDetails);
            }
        }
    },
    {
        path: '/admin/:activeContent?',
        name: 'viewAdmin',
        component: AdminView,
        beforeEnter(to, from, next) {
            let routeDetails = {
                to: to,
                from: from,
                next: next,
                enforceAuthentication: true,
                enforceAlreadyLoggedIn: false,
                enforceRbacWithRole: null
            }
            if(store.getters.appConfig === null){
                store.dispatch("getAppConfig",true).then(
                    ()=>{
                        routeDetails.enforceRbacWithRole = store.getters.appConfig.RBAC_ROLE_ADMIN_VIEW;
                        handleAuthenticationAndRbac(routeDetails);
                    },
                    ()=>{
                        store.dispatch('setActiveCover','missingAppConfig');
                    }
                )
            } else {
                routeDetails.enforceRbacWithRole = store.getters.appConfig.RBAC_ROLE_ADMIN_VIEW;
                handleAuthenticationAndRbac(routeDetails);
            }
        }
    },
    {
        path: '/login',
        name: 'viewLogin',
        component: Authentication,
        beforeEnter(to, from, next) {
            if(store.getters.appConfig === null){
                store.dispatch("getAppConfig",true).then(
                    ()=>{
                        handleCustomLoginViewLogic(next)
                    },
                    ()=>{
                        store.dispatch('setActiveCover','missingAppConfig');
                    }
                )
            } else {
                handleCustomLoginViewLogic(next)
            }
        }
    },
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '*',
        component: NotFound,
        beforeEnter(to, from, next) {
            let routeDetails = {
                to: to,
                from: from,
                next: next,
                enforceAuthentication: true,
                enforceAlreadyLoggedIn: true,
                enforceRbacWithRole: null
            }
            if(store.getters.appConfig === null){
                store.dispatch("getAppConfig",true).then(
                    ()=>{
                        handleAuthenticationAndRbac(routeDetails);
                    },
                    ()=>{
                        store.dispatch('setActiveCover','missingAppConfig');
                    }
                )
            } else {
                handleAuthenticationAndRbac(routeDetails);
            }
        }
    }
];
