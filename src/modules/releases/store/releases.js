import helpers from "@/core/utilities/helpers";
import {appConfig} from "@/main";
import {envConfig} from "@/main";
import log from "@/core/utilities/log";
import api from "@/core/utilities/api";

export default {
    state: {
        releases: [],
        releasesAvailable: true
    },
    getters: {
        releases(state){
            return state.releases;
        },
        releasesAvailable(state){
            return state.releasesAvailable;
        }
    },
    actions: {
        setReleases(context,payload){
            context.commit("setReleases",payload);
        },
        setReleasesAvailable(context,payload){
            context.commit("setReleasesAvailable",payload);
        },
        getReleases({commit,getters},payload){
            return new Promise ((resolve,reject)=>{
                log.text("Requesting Releases");
                api.get('https://api.github.com/repos/marqaaron/spinnaker-advanced-user-lab/releases').then(
                    (response)=>{
                        log.text("Releases successfully retrieved");
                        commit("setReleases",response.data);
                        resolve(true);
                    },
                    (error)=>{
                        log.obj("Applications Request Error",error);
                        reject(api.error(error));
                        commit("setReleasesAvailable",false);
                    }
                )
            })
        },
    },
    mutations: {
        setReleases(state,payload){
            state.releases = payload;
        },
        setReleasesAvailable(state,payload){
            state.releasesAvailable = payload;
        }
    }
}
