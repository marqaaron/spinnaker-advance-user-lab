import {store} from "@/main";
import {enforceAuthentication,pullSaveUserDataFromLocalStorage,enforceAlreadyAuthenticated,redirectToLoginLocation,removeUserDataFromLocalStorage} from "@/core/utilities/helpersAuth";
import NotFound from "@/core/routes/NotFound";
import Authentication from "@/modules/authentication/Authentication";
import ToolsView from "@/views/ToolsView";
import ReferenceView from "@/views/ReferenceView";
import AdminView from "@/views/AdminView";

export const baseRoutes = [
    {
        path: '/tools/:activeContent?',
        name: 'viewTools',
        component: ToolsView,
        beforeEnter(to, from, next) {
            if(store.getters.authenticationEnabled){
                pullSaveUserDataFromLocalStorage();
                enforceAuthentication(next);
            } else {
                removeUserDataFromLocalStorage();
            }
            next();
        }
    },
    {
        path: '/references/:activeContent?',
        name: 'viewReference',
        component: ReferenceView,
        beforeEnter(to, from, next) {
            if(store.getters.authenticationEnabled){
                pullSaveUserDataFromLocalStorage();
                enforceAuthentication(next);
            } else {
                removeUserDataFromLocalStorage();
            }
            next();
        }
    },
    {
        path: '/admin/:activeContent?',
        name: 'viewAdmin',
        component: AdminView,
        beforeEnter(to, from, next) {
            if(store.getters.authenticationEnabled){
                pullSaveUserDataFromLocalStorage();
                enforceAuthentication(next);
            } else {
                removeUserDataFromLocalStorage();
            }
            next();
        }
    },
    {
        path: '/login',
        name: 'viewLogin',
        component: Authentication,
        beforeEnter(to, from, next) {
            if(store.getters.authenticationEnabled){
                pullSaveUserDataFromLocalStorage();
                if(store.getters.isLoggedIn){
                    return next(store.getters.redirects.login);
                } else {
                    store.dispatch('requestUser').then(
                        (response)=>{
                            if(response){
                                enforceAlreadyAuthenticated(next);
                            } else {
                                return next();
                            }
                        },
                        ()=>{
                            return next();
                        }
                    )
                }
            } else {
                removeUserDataFromLocalStorage();
                redirectToLoginLocation(next);
            }
            next();
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
            if(store.getters.authenticationEnabled){
                pullSaveUserDataFromLocalStorage();
                enforceAlreadyAuthenticated(next);
                enforceAuthentication(next);
            } else {
                removeUserDataFromLocalStorage();
            }
            next();
        }
    }
];
