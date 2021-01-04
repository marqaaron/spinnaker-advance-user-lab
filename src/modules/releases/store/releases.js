import log from "@/core/utilities/log";
import api from "@/core/utilities/api";
import {envConfig} from "@/main";
import {images} from "@/modules/releases/store/mockData";

export default {
    state: {
        releases: [],
        releasesAvailable: true,
        releaseListGithubLink: 'https://api.github.com/repos/marqaaron/spinnaker-advanced-user-lab/releases',
        images: [],
        imagesAvailable: true,
        imageListDockerLink: 'https://hub.docker.com/v2/repositories/marqaaron/spinnaker-saul/tags/',
        imagesMockData: images
    },
    getters: {
        releases(state){
            return state.releases;
        },
        releasesAvailable(state){
            return state.releasesAvailable;
        },
        releaseListGithubLink(state){
            return state.releaseListGithubLink;
        },
        images(state){
            return state.images;
        },
        imagesAvailable(state){
            return state.imagesAvailable
        },
        imageListDockerLink(state){
            return state.imageListDockerLink;
        },
        imagesMockData(state){
            return state.imagesMockData;
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
                api.get(getters.releaseListGithubLink).then(
                    (response)=>{
                        log.text("Releases successfully retrieved");
                        commit("setReleases",response.data);
                        resolve(true);
                    },
                    (error)=>{
                        log.obj("Releases Request Error",error);
                        reject(api.error(error));
                        commit("setReleasesAvailable",false);
                    }
                )
            })
        },
        setImages(context,payload){
            context.commit("setImages",payload);
        },
        setImagesAvailable(context,payload){
            context.commit("setImagesAvailable",payload);
        },
        getImages({commit,getters},payload){
            return new Promise ((resolve,reject)=>{
                if(envConfig.NODE_ENV !== 'development'){
                    log.text("Requesting Images");
                    api.get(getters.imageListDockerLink).then(
                        (response)=>{
                            log.text("Images successfully retrieved");
                            commit("setImages",response.data.results);
                            resolve(true);
                        },
                        (error)=>{
                            log.obj("Images Request Error",error);
                            reject(api.error(error));
                            commit("setImagesAvailable",false);
                        }
                    )
                } else {
                    log.text("Setting Images to MockData");
                    commit("setImages",getters.imagesMockData);
                    setTimeout(()=>{
                        resolve(true);
                    },1000);
                }
            })
        },
    },
    mutations: {
        setReleases(state,payload){
            state.releases = payload;
        },
        setReleasesAvailable(state,payload){
            state.releasesAvailable = payload;
        },
        setImages(state,payload){
            state.images = payload;
        },
        setImagesAvailable(state,payload){
            state.imagesAvailable = payload;
        }
    }
}
