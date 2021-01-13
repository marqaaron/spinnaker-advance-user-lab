<template>
    <div class="padded-container" v-if="!isLoadingContent">
        <pipeline-insights></pipeline-insights>
    </div>
    <div v-else>
        <loading-screen></loading-screen>
    </div>
</template>

<script>
import LoadingScreen from "@/core/layout/components/LoadingScreen";
import {mapGetters} from "vuex";
import helpers from "@/core/utilities/helpers";
import PipelinesInsights from "@/modules/pipelinesInsights/PipelinesInsights";

export default {
    name: "InsightsView",
    data() {
        return {
            activeMenu: 'insights',
            defaultContent: 'pipelines',
            availableContent: [
                'pipelines'
            ]
        }
    },
    created() {
        this.setActiveContent();
    },
    destroyed() {

    },
    computed: {
        ...mapGetters([
            'isLoadingContent',
            'activeContent'
        ])
    },
    methods: {
        setActiveContent(){
            let activeContent;
            if(typeof this.$route.params.activeContent !== 'undefined'){
                activeContent = this.$route.params.activeContent;
                this.$store.dispatch('setActiveMenu',this.activeMenu);
                this.$store.dispatch('setActiveContent',activeContent);
                if(!helpers.validContent(this.availableContent,activeContent)){
                    this.$router.replace('/' + this.activeMenu + '/' + this.defaultContent);
                }
                if(helpers.queryPresent(this.$route.query)){
                    console.log('Query Parameters Present but not handled.')
                }
            } else {
                this.$router.replace('/' + this.activeMenu + '/' + this.defaultContent);
            }
        }
    },
    components: {
        'loading-screen': LoadingScreen,
        'pipeline-insights': PipelinesInsights
    },
    watch: {
        $route(){
            this.setActiveContent();
        }
    }
}
</script>

<style scoped>

</style>
