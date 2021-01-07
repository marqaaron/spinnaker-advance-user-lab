<template>
    <b-row>
        <b-col>
            <b-card>
                <b-row>
                    <b-col cols="12">
                        <span class="bold">
                            <documentation-icon doc-id="pete-expression-editor" class="mr-2"></documentation-icon>
                            Pipeline Expression Editor
                        </span>
                        <b-button
                                variant="outline-primary"
                                @click="onCopyExpression"
                                size="sm"
                                class="float-right mb-2"
                                title="Copy Expression"
                                v-b-tooltip.hover
                                :disabled="!expressionEvaluation.expression"
                        >
                            <font-awesome-icon icon="copy"></font-awesome-icon>
                        </b-button>
                        <b-button
                                variant="outline-danger"
                                @click="onClearExpression"
                                size="sm"
                                class="float-right mb-2 mr-1"
                                title="Clear Expression"
                                v-b-tooltip.hover
                                :disabled="!expressionEvaluation.expression"
                        >
                            <font-awesome-icon icon="trash-alt"></font-awesome-icon>
                        </b-button>
                        <hr>
                        <b-alert variant="secondary" show class="mt-2 mb-2 alert-tip">
                            NOTE: Expression must be written without the surrounding <span class="bold">${ }</span>
                        </b-alert>
                        <b-form-textarea
                                id="pipelineExpression"
                                v-model.trim="expressionEvaluation.expression"
                                placeholder="Enter Expression Syntax Here..."
                                rows="6"
                        ></b-form-textarea>
                    </b-col>
                    <b-col cols="12">
                        <hr>
                        <b-button variant="success"
                                  @click="onEvaluateExpression"
                                  block
                                  :disabled="!expressionEvaluation.expression || requestingExpressionEvaluation"
                        >
                            <font-awesome-icon icon="sync"
                                               :spin="requestingExpressionEvaluation"
                            ></font-awesome-icon>
                            <span class="ml-2">
                                Evaluate Expression
                            </span>
                        </b-button>
                    </b-col>
                    <b-col cols="12" v-if="selectedExecutionElementData">
                        <hr>
                        <b-row class="mb-2">
                            <b-col>
                                <span class="bold">
                                <documentation-icon doc-id="pete-expression-syntax-helpers" class="mr-2"></documentation-icon>
                                    Expression Syntax Helpers
                                </span>
                                <b-form-checkbox v-model="executionElementPathMode"
                                                 @change="onUpdateSelectedElementPathInsertMode($event)"
                                                 class="mb-3 float-right pointer" size="sm" switch>
                                    Insert at Cursor Mode
                                </b-form-checkbox>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <expression-helper-direct-path
                                        @emittedInsertText="onHandleInsertText($event)"
                                ></expression-helper-direct-path>
                                <expression-helper-property-name
                                        class="mt-2"
                                        @emittedInsertText="onHandleInsertText($event)"
                                        @emittedOverwritePropertyName="onHandleOverwritePropertyName($event)"
                                ></expression-helper-property-name>
                            </b-col>
                        </b-row>
                        <b-row v-if="displayExpressionHelpersForStringValues">
                            <b-col>
                                <expression-helper-property-value
                                        class="mt-2"
                                        @emittedInsertText="onHandleInsertText($event)"
                                        @emittedOverwritePropertyValue="onHandleOverwritePropertyValue($event)"
                                ></expression-helper-property-value>
                            </b-col>
                        </b-row>
                        <b-row v-if="displayExpressionHelpersForArrayOfObjects">
                            <b-col>
                                <expression-helper-filter-array-property-match
                                        class="mt-2"
                                        @emittedInsertText="onHandleInsertText($event)"
                                ></expression-helper-filter-array-property-match>
                                <expression-helper-filter-array-property-regex
                                        class="mt-2"
                                        @emittedInsertText="onHandleInsertText($event)"
                                ></expression-helper-filter-array-property-regex>
                            </b-col>
                        </b-row>
                        <b-row v-if="displayExpressionHelpersForAnyArray">
                            <b-col>
                                <expression-helper-array-size
                                        class="mt-2"
                                        @emittedInsertText="onHandleInsertText($event)"
                                ></expression-helper-array-size>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
    import {mapGetters} from "vuex";
    import alerts from "@/core/utilities/alerts";
    import insertTextAtCursor from 'insert-text-at-cursor';
    import ExpressionHelperDirectPath
        from "@/modules/pipelineExpressionTester/components/currentTest/components/expressionHelpers/ExpressionHelperDirectPath";
    import ExpressionHelperFilterArrayPropertyMatch from "@/modules/pipelineExpressionTester/components/currentTest/components/expressionHelpers/ExpressionHelperFilterArrayPropertyMatch";
    import ExpressionHelperFilterArrayPropertyRegex from "@/modules/pipelineExpressionTester/components/currentTest/components/expressionHelpers/ExpressionHelperFilterArrayPropertyRegex";
    import ExpressionHelperArraySize from "@/modules/pipelineExpressionTester/components/currentTest/components/expressionHelpers/ExpressionHelperArraySize";
    import ExpressionHelperPropertyValue from "@/modules/pipelineExpressionTester/components/currentTest/components/expressionHelpers/ExpressionHelperPropertyValue";
    import ExpressionHelperPropertyName from "@/modules/pipelineExpressionTester/components/currentTest/components/expressionHelpers/ExpressionHelperPropertyName";
    import DocumentationIconButton from "@/modules/documentation/components/DocumentationIconButton";
    import log from "@/core/utilities/log";
    export default {
        name: "ExpressionEditor",
        data() {
            return {
                expressionEvaluation: null,
                executionElementPathMode: false,
                requestingExpressionEvaluation: false
            }
        },
        created() {
            if(!this.currentExpressionEvaluation){
                this.expressionEvaluation = {...this.defaultExpressionEvaluation};
            } else {
                this.expressionEvaluation = {...this.currentExpressionEvaluation};
            }
            this.executionElementPathMode = this.selectedExecutionElementPathInsertMode;
        },
        computed: {
            ...mapGetters([
                'currentExpressionEvaluation',
                'defaultExpressionEvaluation',
                'selectedExecutionElementData',
                'selectedExecutionElementPathInsertMode',
                'invalidSessionAlertActive'
            ]),
            displayExpressionHelpersForArrayOfObjects(){
                if(this.selectedExecutionElementData){
                    if(Array.isArray(this.selectedExecutionElementData.data)){
                        return (typeof this.selectedExecutionElementData.data[0] === 'object');
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            },
            displayExpressionHelpersForAnyArray(){
                if(this.selectedExecutionElementData){
                    return Array.isArray(this.selectedExecutionElementData.data);
                } else {
                    return false;
                }
            },
            displayExpressionHelpersForStringValues(){
                if(this.selectedExecutionElementData){
                    if(Array.isArray(this.selectedExecutionElementData.data)){
                        return false;
                    } else if(typeof this.selectedExecutionElementData.data === 'object'){
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return false;
                }
            },
            filterArrayByPropertyMatchSyntax(){
                if(this.selectedExecutionElementData){
                    if(Array.isArray(this.selectedExecutionElementData.data)){
                        return this.selectedExecutionElementData.path + '.?[ propertyName == propertyValue ]'
                    } else {
                        return '';
                    }
                } else {
                    return '';
                }
            },
            filterArrayByPropertyRegexSyntax(){
                if(this.selectedExecutionElementData){
                    if(Array.isArray(this.selectedExecutionElementData.data)){
                        return this.selectedExecutionElementData.path + ".?[ propertyName matches '(?i)regexHere' ]"
                    } else {
                        return '';
                    }
                } else {
                    return '';
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
            onEvaluateExpression(){
                this.requestingExpressionEvaluation = true;
                this.expressionEvaluation.expression = this.expressionEvaluation.expression.replace(/^\$((\s*)?{(\s*)?)/,'');
                this.expressionEvaluation.expression = this.expressionEvaluation.expression.replace(/((\s*)?}(\s*)?)$/,'');
                this.$store.dispatch('evaluateExpression',{...this.expressionEvaluation}).then(
                    (result)=>{
                        if(!result && !this.invalidSessionAlertActive){
                            log.obj('Vuex evaluateExpression Promise returned no result');
                            this.invalidSessionAlert();
                            this.requestingExpressionEvaluation = false;
                        } else {
                            log.obj('Vuex evaluateExpression Promise returned',result);
                            this.$store.dispatch("setCurrentTestViewer","results");
                            this.$store.dispatch("setSelectedExecutionElementData",null);
                            this.requestingExpressionEvaluation = false;
                        }
                    },
                    (error)=>{
                        this.$swal(alerts.endpointError(error));
                        this.requestingExpressionEvaluation = false;
                    }
                );
            },
            onCopyExpression(){
                let textToCopy = this.expressionEvaluation.expression;
                let fullExpressionCheck = textToCopy.match(/^\$\{.*\}$/);
                if(!fullExpressionCheck){
                    textToCopy = '${ ' + textToCopy + ' }';
                }
                this.$copyText(textToCopy);
                this.$swal(alerts.copySuccess());
            },
            insertPath(_text){
                const el = document.getElementById('pipelineExpression');
                insertTextAtCursor(el,_text);
            },
            onHandleInsertText(_event){
                this.insertPath(_event);
            },
            onUpdateSelectedElementPathInsertMode(event){
                this.$store.dispatch("setSelectedExecutionElementPathInsertMode",event);
            },
            onClearExpression(){
                this.expressionEvaluation.expression = '';
                this.expressionEvaluation.evaluationResult = '';
                this.expressionEvaluation.results = '';
                this.$store.dispatch("setSelectedExecutionElementData",null);
                this.$store.dispatch("setCurrentTestViewer","execution");
            },
            onHandleOverwritePropertyName(_event){
                this.expressionEvaluation.expression = this.expressionEvaluation.expression.replace(/propertyName/,_event);
            },
            onHandleOverwritePropertyValue(_event){
                this.expressionEvaluation.expression = this.expressionEvaluation.expression.replace(/propertyValue/,_event);
            }
        },
        components: {
            'expression-helper-direct-path': ExpressionHelperDirectPath,
            'expression-helper-filter-array-property-match': ExpressionHelperFilterArrayPropertyMatch,
            'expression-helper-filter-array-property-regex': ExpressionHelperFilterArrayPropertyRegex,
            'expression-helper-array-size': ExpressionHelperArraySize,
            'expression-helper-property-value': ExpressionHelperPropertyValue,
            'expression-helper-property-name': ExpressionHelperPropertyName,
            'documentation-icon': DocumentationIconButton
        }
    }
</script>

<style scoped>
    label,.bold{
        font-weight:bold;
    }
    .alert-tip{
        font-size: 12px;
    }
</style>
