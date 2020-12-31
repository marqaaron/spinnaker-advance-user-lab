<template>
    <div class="padded-container" v-if="!isLoadingContent">
        <pipeline-expression-tester v-if="activeContent === 'pipeline-expression-tester'"></pipeline-expression-tester>
    </div>
    <div v-else>
        <loading-screen></loading-screen>
    </div>
</template>

<script>
import LoadingScreen from "@/core/layout/components/LoadingScreen";
import {mapGetters} from "vuex";
import PipelineExpressionTester from "@/modules/pipelineExpressionTester/PipelineExpressionTester";
import helpers from "@/core/utilities/helpers";
export default {
    name: "ToolsView",
    data() {
        return {
            activeMenu: 'tools',
            defaultContent: 'pipeline-expression-tester',
            availableContent: [
                'pipeline-expression-tester'
            ]
        }
    },
    created() {
        this.setActiveContent();
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
        'pipeline-expression-tester': PipelineExpressionTester
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
