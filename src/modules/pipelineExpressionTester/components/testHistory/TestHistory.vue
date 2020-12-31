<template>
    <b-card>
        <b-row>
            <b-col cols="12">
            <span class="bold">
                <documentation-icon doc-id="pete-test-history" class="mr-2"></documentation-icon>
                <span>
                     Test History
                </span>
            </span>
                <hr>
            </b-col>
            <b-col cols="12" v-if="expressionEvaluationHistory.length > 0">
                <b-list-group>
                    <b-list-group-item
                        v-for="(item,index) in expressionEvaluationHistory"
                        :key="index"
                        class="test-history-item"
                        :active="showResults(index)"
                    >
                        <b-row>
                            <b-col cols="1">
                                {{index + 1}}
                            </b-col>
                            <b-col cols="4">
                                <b-row class="test-details">
                                    <b-col cols="12">
                                        <span class="details-label">App:</span> {{item.applicationName}}
                                    </b-col>
                                    <b-col cols="12">
                                        <span class="details-label">Pipeline:</span> {{item.pipelineName}}
                                    </b-col>
                                    <b-col cols="12">
                                        <span class="details-label">Execution:</span> {{item.pipelineId}}
                                    </b-col>
                                </b-row>
                            </b-col>
                            <b-col cols="4">
                                <b-row class="expression-details">
                                    <b-col cols="12"
                                           class="successful-text"
                                           v-if="item.evaluationResult === 'Successful'">
                                        Expression Successful
                                    </b-col>
                                    <b-col cols="12"
                                           class="failed-text"
                                           v-else>
                                        Expression Failed
                                    </b-col>
                                    <b-col cols="12"
                                           class="expression">
                                        {{item.expression}}
                                    </b-col>
                                    <b-col cols="12">

                                    </b-col>
                                </b-row>
                            </b-col>
                            <b-col cols="3">
                                <b-button-group class="btn-block">
                                    <b-button variant="outline-primary"
                                              size="sm"
                                              title="Copy Expression"
                                              v-b-tooltip.hover
                                              @click="onCopyExpression(item.expression)">
                                        <font-awesome-icon icon="copy"></font-awesome-icon>
                                    </b-button>
                                    <b-button variant="outline-secondary"
                                              @click="onShowResults(index)"
                                              size="sm">
                                        Result
                                    </b-button>
                                    <b-button variant="success"
                                              @click="onReloadTest(item)"
                                              size="sm">
                                        Reload
                                    </b-button>
                                </b-button-group>
                            </b-col>
                        </b-row>
                        <b-row v-if="showResults(index)">
                            <b-col>
                                <hr>
                                <div id="resultsContainer">
                                    <vue-json-pretty
                                        :path="item.expression"
                                        :data="item.results"
                                        :deep="1"
                                        :showLength="true"
                                        selectableType="single"
                                    ></vue-json-pretty>
                                </div>
                            </b-col>
                        </b-row>
                    </b-list-group-item>
                </b-list-group>
            </b-col>
            <b-col v-else>
                <b-alert variant="secondary" show>No Test History to Display!</b-alert>
            </b-col>
        </b-row>
    </b-card>
</template>

<script>
    import {mapGetters} from "vuex";
    import VueJsonPretty from "vue-json-pretty";
    import alerts from "@/core/utilities/alerts";
    import DocumentationIconButton from "@/modules/documentation/components/DocumentationIconButton";
    export default {
        name: "TestHistory",
        data() {
            return {
                showingResults: false
            }
        },
        created() {

        },
        computed: {
            ...mapGetters([
                'expressionEvaluationHistory'
            ])
        },
        methods: {
            onShowResults(_index){
                if(this.showingResults === _index){
                    this.showingResults = false;
                } else {
                    this.showingResults = _index;
                }
            },
            showResults(_index){
                if(this.expressionEvaluationHistory){
                    return _index === this.showingResults;
                } else {
                    return false;
                }
            },
            onReloadTest(_item){
                this.$store.dispatch("reloadTest",{..._item});
            },
            onCopyExpression(_expression){
                let textToCopy = _expression;
                let fullExpressionCheck = textToCopy.match(/^\$\{.*\}$/);
                if(!fullExpressionCheck){
                    textToCopy = '${ ' + textToCopy + ' }';
                }
                this.$copyText(textToCopy);
                this.$swal(alerts.copySuccess());
            }
        },
        components: {
            'vue-json-pretty': VueJsonPretty,
            'documentation-icon': DocumentationIconButton
        }
    }
</script>

<style scoped>
    .test-details {
        font-size:14px;
    }
    .expression-details{
        text-align: center;
        font-size: 14px;
    }
    .details-label {
        font-weight:bold;
    }
    .successful-text {
        color: green;
        font-weight:bold;
    }
    .failed-text {
        color:red;
        font-weight:bold;
    }
    .expression{
        overflow-wrap: break-word;
    }
    #resultsContainer {
        background-color:#272725;
        color:#eeff00;
        padding:15px;
        border-radius:3px;
        overflow-wrap: break-word;
    }
    .test-history-item {
        background-color: #fbfbfb;
    }
</style>
