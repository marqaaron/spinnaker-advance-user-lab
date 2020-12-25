<template>
    <div>
        <b-row>
            <b-col cols="6">
                <b-button-group class="btn-block mb-2">
                    <b-button :variant="setConfigButtonClass('settings')"
                              @click="setConfig('settings')"
                    >Settings</b-button>
                    <b-button :variant="setConfigButtonClass('expression')"
                              @click="setConfig('expression')"
                              :disabled="disableViewerTabs"
                    >Expression</b-button>
                </b-button-group>
                <b-row>
                    <b-col v-if="currentConfigViewer === 'settings'">
                        <test-settings></test-settings>
                    </b-col>
                    <b-col v-else-if="currentConfigViewer === 'expression'">
                        <expression-editor></expression-editor>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="6">
                <b-button-group class="btn-block mb-2">
                    <b-button :variant="setViewerButtonClass('execution')"
                              @click="setViewer('execution')"
                              :disabled="disableViewerTabs"
                    >Execution</b-button>
                    <b-button :variant="setViewerButtonClass('results')"
                              @click="setViewer('results')"
                              :disabled="disableViewerTabs || disableResultsViewerTab"
                    >Results</b-button>
                </b-button-group>
                <b-row>
                    <b-col v-if="currentTestViewer === 'execution'">
                        <execution-viewer></execution-viewer>
                    </b-col>
                    <b-col v-else-if="currentTestViewer === 'results'">
                        <results-viewer></results-viewer>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import ExecutionViewer from "@/modules/pipelineExpressionTester/components/currentTest/components/ExecutionViewer";
    import ResultsViewer from "@/modules/pipelineExpressionTester/components/currentTest/components/ResultsViewer";
    import TestSettings from "@/modules/pipelineExpressionTester/components/currentTest/components/TestSettings";
    import ExpressionEditor
        from "@/modules/pipelineExpressionTester/components/currentTest/components/ExpressionEditor";
    export default {
        name: "CurrentTest",
        data() {
            return {

            }
        },
        created() {

        },
        computed: {
            ...mapGetters([
                'currentTestViewer',
                'currentConfigViewer',
                'currentExpressionEvaluation'
            ]),
            disableViewerTabs(){
                if(!this.currentExpressionEvaluation){
                    return true;
                } else {
                    return this.currentExpressionEvaluation.pipelineId === '';
                }
            },
            disableResultsViewerTab(){
                if(!this.currentExpressionEvaluation){
                    return true;
                } else {
                    return this.currentExpressionEvaluation.evaluationResult === '';
                }
            }
        },
        methods: {
            setViewerButtonClass(_section){
                if(_section === this.currentTestViewer){
                    return 'primary';
                } else {
                    return 'outline-primary';
                }
            },
            setConfigButtonClass(_section){
                if(_section === this.currentConfigViewer){
                    return 'primary';
                } else {
                    return 'outline-primary';
                }
            },
            setViewer(_section){
                this.$store.dispatch("setCurrentTestViewer",_section);
            },
            setConfig(_section){
                this.$store.dispatch("setCurrentConfigViewer",_section);
            }
        },
        components: {
            'execution-viewer': ExecutionViewer,
            'results-viewer': ResultsViewer,
            'test-settings': TestSettings,
            'expression-editor': ExpressionEditor
        }
    }
</script>

<style scoped>

</style>
