import log from "@/core/utilities/log";
import api from "@/core/utilities/api";
import {envConfig} from "@/main";
import {images,releases} from "@/modules/releases/store/mockData";
import helpers from "@/core/utilities/helpers";

const enrichReleasesWithImages = function(_releases,_images){
    let i,j;
    let releases = [..._releases];
    let images = [..._images];
    for (i = 0; i < releases.length; i++) {
        releases[i]["imageAvailable"] = false;
        releases[i]["imageDetails"] = {};
        let imageName = releases[i]["tag_name"].replace('v','');
        for(j = 0; j < images.length; j++){
            if(imageName === images[j]["name"]){
                releases[i]["imageAvailable"] = true;
                releases[i]["imageDetails"]["name"] = images[j]["name"];
                releases[i]["imageDetails"]["last_updated"] = images[j]["last_updated"];
                releases[i]["imageDetails"]["last_tag_pushed"] = images[j]["tag_last_pushed"];
                releases[i]["imageDetails"]["last_updater_username"] = images[j]["last_updater_username"];
                releases[i]["imageDetails"]["digest"] = images[j]["images"][0]["digest"];
                releases[i]["imageDetails"]["short_digest"] = releases[i]["imageDetails"]["digest"].substring(7,19);
                releases[i]["imageDetails"]["os"] = images[j]["images"][0]["os"];
                releases[i]["imageDetails"]["architecture"] = images[j]["images"][0]["architecture"];
                releases[i]["imageDetails"]["full_size_mb"] = (images[j]["full_size"] / 1000000).toPrecision(4);
                releases[i]["imageDetails"]["status"] = images[j]["images"][0]["status"];
                releases[i]["imageDetails"]["url"] = "https://hub.docker.com/layers/marqaaron/spinnaker-saul/" + releases[i]["imageDetails"]["name"] + "/images/" + releases[i]["imageDetails"]["digest"].replace(":","-");
            }
        }
    }
    return releases;
}

export default {
    state: {
        releases: [],
        releasesAvailable: true,
        releaseListGithubLink: 'https://api.github.com/repos/marqaaron/spinnaker-advanced-user-lab/releases',
        releaseListSaulLink: '/saul-api/releases/versions',
        images: [],
        imagesAvailable: true,
        imageListDockerLink: 'https://hub.docker.com/v2/repositories/marqaaron/spinnaker-saul/tags/',
        imageListSaulLink: '/saul-api/releases/images',
        imagesMockData: images,
        releasesMockData: releases
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
        releaseListSaulLink(state){
            return state.releaseListSaulLink;
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
        imageListSaulLink(state){
            return state.imageListSaulLink;
        },
        imagesMockData(state){
            return state.imagesMockData;
        },
        releasesMockData(state){
            return state.releasesMockData;
        },
        displayableReleases(state,getters){
            if(getters.imagesAvailable){
                return helpers.filterArrayByObjPropertyValue(getters.releases,'imageAvailable',true);
            } else {
                return state.releases;
            }
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
                if(envConfig.VUE_APP_SAUL_HTTP_REQUESTS === 'enabled'){
                    log.text("Requesting Releases");
                    api.get(getters.releaseListSaulLink).then(
                        (response)=>{
                            log.text("Releases successfully retrieved");
                            commit("setReleases",response.data.saul_data);
                            resolve(true);
                        },
                        (error)=>{
                            log.obj("Releases Request Error",error);
                            reject(api.error(error));
                            commit("setReleasesAvailable",false);
                        }
                    )
                } else {
                    log.text("Setting Releases to MockData");
                    setTimeout(()=>{
                        commit("setReleases",getters.releasesMockData);
                        resolve(true);
                    },1000);
                }
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
                if(envConfig.VUE_APP_SAUL_HTTP_REQUESTS === 'enabled'){
                    log.text("Requesting Images");
                    api.get(getters.imageListSaulLink).then(
                        (response)=>{
                            log.text("Images successfully retrieved");
                            commit("setImages",response.data.saul_data.results);
                            let enrichedReleases = enrichReleasesWithImages(getters.releases,response.data.saul_data.results);
                            commit("setReleases",enrichedReleases);
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
                    setTimeout(()=>{
                        commit("setImages",getters.imagesMockData);
                        let enrichedReleases = enrichReleasesWithImages(getters.releases,getters.imagesMockData);
                        commit("setReleases",enrichedReleases);
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
