<template>
    <div v-if="contentLoaded">
        <b-row>
            <b-col>
                <p class="releases-header text-center">
                    SAUL Releases
                    <b-button-group class="float-right">
                        <b-button variant="outline-secondary" size="sm" @click="openDockerRegistry()">
                            <b-icon icon="box" aria-hidden="true" class="mr-2"></b-icon><span>Images</span>
                        </b-button>
                        <b-button variant="outline-secondary" size="sm" @click="openGithubRepo()">
                            <b-icon icon="github" aria-hidden="true" class="mr-2"></b-icon><span>Repo</span>
                        </b-button>
                    </b-button-group>
                </p>
                <hr>
            </b-col>
        </b-row>
        <releases-list></releases-list>
    </div>
    <div v-else style="height:100%;width:100%;margin:auto">
        <loading-screen ></loading-screen>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import log from "@/core/utilities/log";
import alerts from "@/core/utilities/alerts";
import ReleasesList from "@/modules/releases/components/ReleasesList";
import LoadingScreen from "@/core/layout/components/LoadingScreen";

export default {
    name: "Releases",
    props: {

    },
    data() {
        return {
            contentLoaded: false
        }
    },
    created() {
        this.emitContentLoaded();
        if(this.releasesAvailable){
            this.$store.dispatch('getReleases').then(
                (result)=>{
                    log.obj('Vuex getReleases Promise returned',result);
                    if(this.imagesAvailable){
                        this.$store.dispatch('getImages').then(
                            (result)=>{
                                log.obj('Vuex getImages Promise returned',result);
                                this.onContentLoaded();
                            },
                            (error)=>{
                                this.onContentLoaded();
                                this.$swal(alerts.endpointError(error));
                            }
                        );
                    } else {
                        setTimeout(()=>{
                            this.onContentLoaded();
                        }, 1000)
                    }
                },
                (error)=>{
                    this.onContentLoaded();
                    this.$swal(alerts.endpointError(error));
                }
            );
        } else {
            setTimeout(()=>{
                this.onContentLoaded();
            }, 1000)
        }
    },
    computed: {
        ...mapGetters([
            'releases',
            'releasesAvailable',
            'images',
            'imagesAvailable'
        ])
    },
    methods: {
        openGithubRepo(){
            window.open('https://github.com/marqaaron/spinnaker-advanced-user-lab/releases','_blank');
        },
        openDockerRegistry(){
            window.open('https://hub.docker.com/r/marqaaron/spinnaker-saul','_blank');
        },
        onContentLoaded(){
            this.contentLoaded = true;
            this.emitContentLoaded()
        },
        emitContentLoaded(){
            this.$emit('contentLoaded',this.contentLoaded);
        }
    },
    components: {
        'releases-list': ReleasesList,
        'loading-screen': LoadingScreen
    }
}
</script>

<style scoped>
.releases-header {
    font-size: 2.0rem;
    font-weight: bolder;
}
</style>
