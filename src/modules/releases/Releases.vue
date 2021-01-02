<template>
    <div>
        <b-row>
            <b-col>
                <p class="releases-header text-center">
                    SAUL Releases
                    <b-button variant="outline-secondary" size="sm" class="float-right" @click="openGithubRepo()">
                        <b-icon icon="box-arrow-up-right" aria-hidden="true" class="mr-2"></b-icon><span>View at Github</span>
                    </b-button>
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
                (response)=>{
                    log.obj('Vuex getReleases Promise returned',response);
                },
                (reject)=>{
                    this.$swal(alerts.genericError(reject.title,reject.message));
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
