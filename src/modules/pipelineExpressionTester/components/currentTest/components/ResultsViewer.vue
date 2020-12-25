<template>
    <div v-if="!currentExpressionEvaluation || currentExpressionEvaluation.results === ''">
        <b-row>
            <b-col>
                <b-alert variant="secondary" show>No Current Test Results to Display!</b-alert>
            </b-col>
        </b-row>
    </div>
    <div v-else>
        <b-row>
            <b-col>
                <b-alert variant="success"
                         class="results-banner"
                         v-if="currentExpressionEvaluation.evaluationResult === 'Successful'"
                         show>Evaluation Successful!</b-alert>
                <b-alert variant="danger"
                         class="results-banner"
                         v-else
                         show>Evaluation Failed!</b-alert>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <div id="currentEvaluationContainer">
                    <vue-json-pretty
                        :path="currentExpressionEvaluation.expression"
                        :data="currentExpressionEvaluation.results"
                        :deep="1"
                        :showLength="true"
                        selectableType="single"
                        @click="onClick"
                    ></vue-json-pretty>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import VueJsonPretty from "vue-json-pretty";
    export default {
        name: "ResultsViewer",
        data() {
            return {

            }
        },
        created() {

        },
        computed: {
            ...mapGetters([
                'currentExpressionEvaluation'
            ])
        },
        methods: {
            onClick(_path,_data){
                if(this.currentExpressionEvaluation.evaluationResult === 'Successful'){
                    let payload = {
                        "path": _path,
                        "data": _data
                    }
                    this.$store.dispatch("setSelectedExecutionElementData",payload);
                }
            }
        },
        components: {
            'vue-json-pretty': VueJsonPretty
        }
    }
</script>

<style scoped>
    .results-banner {
        text-align: center;
        font-weight: bold;
    }

    #currentEvaluationContainer{
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
