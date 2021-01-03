<template>
    <div>
        <b-row>
            <b-col>
                <p class="releases-header text-center">
                    SAUL Releases
                    <b-button-group class="float-right">
                        <b-button variant="outline-secondary" size="sm" @click="openDockerRegistry()">
                            <b-icon icon="file-earmark-code" aria-hidden="true" class="mr-2"></b-icon><span>Images</span>
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
</template>

<script>
import {mapGetters} from "vuex";
import log from "@/core/utilities/log";
import alerts from "@/core/utilities/alerts";
import ReleasesList from "@/modules/releases/components/ReleasesList";
export default {
    name: "Releases",
    props: {

    },
    data() {
        return {

        }
    },
    created() {
        if(this.releasesAvailable){
            this.$store.dispatch('getReleases').then(
                (result)=>{
                    log.obj('Vuex getReleases Promise returned',result);
                },
                (error)=>{
                    this.$swal(alerts.endpointError(error));
                }
            );
        }
    },
    computed: {
        ...mapGetters([
            'releases',
            'releasesAvailable'
        ])
    },
    methods: {
        openGithubRepo(){
            window.open('https://github.com/marqaaron/spinnaker-advanced-user-lab/releases','_blank');
        },
        openDockerRegistry(){
            window.open('https://hub.docker.com/r/marqaaron/spinnaker-saul','_blank');
        }
    },
    components: {
        'releases-list': ReleasesList
    }
}
</script>

<style scoped>
.releases-header {
    font-size: 2.0rem;
    font-weight: bolder;
}
</style>
