<template>
    <b-row>
        <b-col>
            <b-card>
                <b-row>
                    <b-col>
                        <span class="bold">
                            <documentation-icon doc-id="pete-test-settings" class="mr-2"></documentation-icon>
                            <span>
                                 Tester Settings
                            </span>
                        </span>
                        <b-button variant="outline-danger"
                                  size="sm"
                                  @click="onResetTestSettings"
                                  title="Reset Test Form"
                                  v-b-tooltip.hover
                                  class="float-right">
                            <font-awesome-icon
                                    icon="trash-alt"></font-awesome-icon>
                        </b-button>
                        <hr>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <label for="applicationSelect">Application</label>
                        <b-input-group>
                            <b-form-select
                                    id="applicationSelect"
                                    v-model="expressionEvaluation.applicationName"
                                    :disabled="applicationsLoading"
                                    @change="requestApplicationPipelineConfigsAndExecutions(expressionEvaluation.applicationName)"
                                    :options="applicationSelectListOptions"></b-form-select>
                            <b-input-group-append>
                                <b-button variant="warning"
                                          title="Refresh Applications"
                                          v-b-tooltip.hover
                                          @click="requestApplications"
                                          block>
                                    <font-awesome-icon icon="sync"
                                                       :spin="applicationsLoading"
                                    ></font-awesome-icon>
                                </b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row v-if="expressionEvaluation.applicationName !== ''">
                    <b-col>
                        <hr>
                        <label for="pipelineSelect">Pipeline</label>
                        <b-input-group>
                            <b-form-select
                                    id="pipelineSelect"
                                    v-model="expressionEvaluation.pipelineName"
                                    @change="onSetPipeline"
                                    :disabled="pipelineConfigsLoading"
                                    :options="applicationPipelineConfigSelectListOptions"></b-form-select>
                            <b-input-group-append>
                                <b-button variant="warning"
                                          title="Refresh Pipelines"
                                          v-b-tooltip.hover
                                          @click="requestApplicationPipelineConfigs"
                                          block>
                                    <font-awesome-icon icon="sync"
                                                       :spin="pipelineConfigsLoading"
                                    ></font-awesome-icon>
                                </b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row v-if="expressionEvaluation.pipelineName">
                    <b-col>
                        <hr>
                        <label for="executionSelect">Execution</label>
                        <b-input-group>
                            <b-form-select
                                    id="executionSelect"
                                    v-model="expressionEvaluation.pipelineId"
                                    @change="onSetPipelineExecution"
                                    :disabled="pipelineExecutionsLoading"
                                    :options="applicationPipelineExecutionsSelectListOptions"></b-form-select>
                            <b-input-group-append>
                                <b-button variant="warning"
                                          title="Refresh Executions"
                                          v-b-tooltip.hover
                                          @click="requestApplicationPipelineExecutions(expressionEvaluation.applicationName)"
                                          block>
                                    <font-awesome-icon icon="sync"
                                                       :spin="pipelineExecutionsLoading"
                                    ></font-awesome-icon>
                                </b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
                </b-row>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
    import {mapGetters} from "vuex";
    import alerts from "@/core/utilities/alerts";
    import helpers from "@/core/utilities/helpers";
    import DocumentationIconButton from "@/modules/documentation/components/DocumentationIconButton";
    import log from "@/core/utilities/log";
    export default {
        name: "TestSettings",
        data() {
            return {
                applicationsLoading: false,
                pipelineConfigsLoading: false,
                pipelineExecutionsLoading: false,
                expressionEvaluation: null
            }
        },
        created() {
            this.requestApplications();
            if(!this.currentExpressionEvaluation){
                this.expressionEvaluation = {...this.defaultExpressionEvaluation};
            } else {
                this.expressionEvaluation = this.currentExpressionEvaluation;
                this.requestApplicationPipelineConfigs(this.expressionEvaluation.applicationName);
                this.requestApplicationPipelineExecutions(this.expressionEvaluation.applicationName);
            }
        },
        computed: {
            ...mapGetters([
                'currentExpressionEvaluation',
                'defaultExpressionEvaluation',
                'applications',
                'applicationPipelineConfigs',
                'applicationPipelineExecutions',
                'selectedExecutionElementData'
            ]),
            applicationSelectListOptions(){
                let options = [];
                options.push({
                    text: 'Select an Application',
                    value: ''
                })
                let sortedApplications = helpers.sortArrayBySingleObjProperty(this.applications,'name','ascending');
                sortedApplications.forEach(function(item){
                    options.push({
                        text: item.name,
                        value: item.name
                    })
                })
                return options;
            },
            applicationPipelineConfigSelectListOptions(){
                if(typeof this.expressionEvaluation !== 'undefined' && this.expressionEvaluation.applicationName !== ''){
                    let options = [];
                    options.push({
                        text: 'Select a Pipeline',
                        value: ''
                    })
                    let sortedPipelineConfigs = helpers.sortArrayBySingleObjProperty(this.applicationPipelineConfigs,'name','ascending');
                    sortedPipelineConfigs.forEach(function(item){
                        options.push({
                            text: item.name,
                            value: item.name
                        })
                    })
                    return options;
                } else {
                    return [];
                }
            },
            applicationPipelineExecutionsSelectListOptions(){
                if(typeof this.expressionEvaluation !== 'undefined' && this.expressionEvaluation.pipelineName !== ''){
                    let filteredExecutions = helpers.filterArrayByObjPropertyValue(this.applicationPipelineExecutions,'name',this.expressionEvaluation.pipelineName);
                    let sortedFilteredExecutions = helpers.sortArrayBySingleObjProperty(filteredExecutions,'startTime','descending');
                    let options = [], time;
                    options.push({
                        text: 'Select an Execution',
                        value: ''
                    })
                    sortedFilteredExecutions.forEach(function(item){
                        time = helpers.toMomentFromNow(item.startTime);
                        options.push({
                            text: time + ': ' + item.id,
                            value: item.id
                        })
                    })
                    return options;
                } else {
                    return [];
                }
            }
        },
        methods: {
            invalidSessionAlert(){
                this.$store.dispatch('setInvalidSessionAlertActive',true);
                this.$swal(alerts.confirmSessionInvalid()).then(
                    (result)=>{
                        if(result.isConfirmed){
                            this.$store.dispatch('setInvalidSessionAlertActive',false);
                            this.$store.dispatch('logIn');
                        } else {
                            this.$store.dispatch('setInvalidSessionAlertActive',false);
                        }
                    }
                );
            },
            requestApplications(){
                this.applicationsLoading = true;
                this.$store.dispatch('getApplications').then(
                    (result) => {
                        if(!result && !this.invalidSessionAlertActive){
                            log.obj('Vuex getApplications Promise returned no result');
                            this.invalidSessionAlert();
                            this.applicationsLoading = false;
                        } else {
                            log.obj('Vuex getApplications Promise returned',result);
                            this.applicationsLoading = false;
                        }
                    },
                    (error) => {
                        this.applicationsLoading = false;
                        this.$swal(alerts.endpointError(error));
                    }
                );
            },
            requestApplicationPipelineConfigsAndExecutions(_applicationName){
                this.requestApplicationPipelineConfigs(_applicationName);
                this.requestApplicationPipelineExecutions(_applicationName);
                if(this.currentExpressionEvaluation){
                    this.$store.dispatch('setCurrentExpressionEvaluation',null);
                }
                this.expressionEvaluation.pipelineName = '';
                this.expressionEvaluation.pipelineId = '';
            },
            requestApplicationPipelineConfigs(_applicationName){
                this.pipelineConfigsLoading = true;
                this.$store.dispatch('getApplicationPipelineConfigs',_applicationName).then(
                    (result) => {
                        if(!result && !this.invalidSessionAlertActive){
                            log.obj('Vuex getApplicationPipelineConfigs Promise returned no result');
                            this.invalidSessionAlert();
                            this.pipelineConfigsLoading = false;
                        } else {
                            log.obj('Vuex getApplicationPipelineConfigs Promise returned',result);
                            this.$store.dispatch("setApplicationPipelineConfigs",result);
                            this.pipelineConfigsLoading = false;
                        }
                    },
                    (error) => {
                        this.pipelineConfigsLoading = false;
                        this.$swal(alerts.endpointError(error));
                    }
                );
            },
            requestApplicationPipelineExecutions(_applicationName){
                this.pipelineExecutionsLoading = true;
                this.$store.dispatch('getApplicationPipelineExecutions',_applicationName).then(
                    (result) => {
                        if(!result && !this.invalidSessionAlertActive){
                            log.obj('Vuex getApplicationPipelineExecutions Promise returned no result');
                            this.invalidSessionAlert();
                            this.pipelineExecutionsLoading = false;
                        } else {
                            log.obj('Vuex getApplicationPipelineExecutions Promise returned',result);
                            this.$store.dispatch("setApplicationPipelineExecutions",result);
                            this.pipelineExecutionsLoading = false;
                        }
                    },
                    (error) => {
                        this.pipelineExecutionsLoading = false;
                        this.$swal(alerts.endpointError(error));
                    }
                );
            },
            onSetPipeline(){
                if(this.currentExpressionEvaluation){
                    this.$store.dispatch('setCurrentExpressionEvaluation',null);
                }
                this.expressionEvaluation.pipelineId = '';
                this.$store.dispatch("setSelectedExecutionElementData",null);
            },
            onSetPipelineExecution(){
                this.$store.dispatch('setCurrentExpressionEvaluation',this.expressionEvaluation);
                this.$store.dispatch("setCurrentConfigViewer",'expression');
            },
            onResetTestSettings(){
                this.expressionEvaluation = {...this.defaultExpressionEvaluation};
                this.$store.dispatch('setCurrentExpressionEvaluation',null);
                this.$store.dispatch("setSelectedExecutionElementData",null);
            }
        },
        components: {
            'documentation-icon': DocumentationIconButton
        }
    }
</script>

<style scoped>
    label,.bold{
        font-weight:bold;
    }
</style>
