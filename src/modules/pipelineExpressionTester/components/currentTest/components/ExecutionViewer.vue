<template>
    <div v-if="currentExecution">
        <b-row>
            <b-col>
                <div id="currentExecutionContainer">
                    <vue-json-pretty
                            path="execution"
                            :data="currentExecution"
                            :deep="1"
                            :showLength="true"
                            selectableType="single"
                            @click="onClick"
                    ></vue-json-pretty>
                </div>
            </b-col>
        </b-row>
    </div>
    <div v-else>
        <b-row>
            <b-col>
                <b-alert variant="secondary" show>No Current Execution to Display!</b-alert>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import helpers from "@/core/utilities/helpers";
    import VueJsonPretty from 'vue-json-pretty'
    export default {
        name: "ExecutionViewer",
        data() {
            return {

            }
        },
        created() {

        },
        computed: {
            ...mapGetters([
                'currentExpressionEvaluation',
                'applicationPipelineExecutions',
                'selectedExecutionElementData'
            ]),
            currentExecution(){
                if(this.currentExpressionEvaluation){
                    let filteredExecutions = helpers.filterArrayByObjPropertyValue(this.applicationPipelineExecutions,'id',this.currentExpressionEvaluation.pipelineId);
                    return filteredExecutions[0];
                } else {
                    return false;
                }
            }
        },
        methods: {
            onClick(_path,_data){
                let payload = {
                    "path": _path,
                    "data": _data
                }
                this.$store.dispatch("setSelectedExecutionElementData",payload);
            }
        },
        components: {
            'vue-json-pretty': VueJsonPretty
        }
    }
</script>

<style>

    #currentExecutionContainer{
        background-color:#272725;
        color:#eeff00;
        padding:15px;
        border-radius:3px;
        overflow-wrap: break-word;
    }

    .vjs-key{
        cursor:pointer;
    }

</style>
