import helpers from "@/core/utilities/helpers";
import {testerSettingsFeatureOverview} from "@/modules/pipelineExpressionTester/components/currentTest/components/testSettings/docs/testSettingsDocs";
import {expressionEditorFeatureOverview} from "@/modules/pipelineExpressionTester/components/currentTest/components/expressionEditor/docs/expressionEditorDocs";
import {executionContextViewerFeatureOverview} from "@/modules/pipelineExpressionTester/components/currentTest/components/executionViewer/docs/executionViewerDocs";
import {expressionSyntaxHelperFeatureOverview} from "@/modules/pipelineExpressionTester/components/currentTest/components/expressionHelpers/docs/expressionHelpersDocs";
import {expressionResultsViewerFeatureOverview} from "@/modules/pipelineExpressionTester/components/currentTest/components/resultsViewer/docs/resultsViewerDocs";
import {testHistoryFeatureOverview} from "@/modules/pipelineExpressionTester/components/testHistory/components/docs/testHistoryDocs";

export default {
    state: {
        documentationVisible: false,
        standaloneDocumentation: false,
        documentationSliderPosition: 'right',
        documentationSliderWidth: '50%',
        viewDocumentation: null,
        availableDocumentation: [
            {
                id: 'pete-test-settings',
                title: 'Pipeline Expression Test Environment: Test Settings',
                summary: "Details on how to use the Test Settings feature of the Pipeline Expression Test Environment",
                categories: 'docs',
                markdown: testerSettingsFeatureOverview
            },
            {
                id: 'pete-execution-context-viewer',
                title: 'Pipeline Expression Test Environment: Execution Context Viewer',
                summary: "Details on how to use the Execution Context Viewer feature of the Pipeline Expression Test Environment",
                categories: 'docs',
                markdown: executionContextViewerFeatureOverview
            },
            {
                id: 'pete-expression-editor',
                title: 'Pipeline Expression Test Environment: Pipeline Expression Editor',
                summary: "Details on how to use the Pipeline Expression Editor feature of the Pipeline Expression Test Environment",
                categories: 'docs',
                markdown: expressionEditorFeatureOverview
            },
            {
                id: 'pete-expression-syntax-helpers',
                title: 'Pipeline Expression Test Environment: Expression Syntax Helpers',
                summary: "Details on how to use the Expression Syntax Helpers feature of the Pipeline Expression Test Environment",
                categories: 'docs',
                markdown: expressionSyntaxHelperFeatureOverview
            },
            {
                id: 'pete-results-viewer',
                title: 'Pipeline Expression Test Environment: Expression Results Viewer',
                summary: "Details on how to use the Expression Results Viewer feature of the Pipeline Expression Test Environment",
                categories: 'docs',
                markdown: expressionResultsViewerFeatureOverview
            },
            {
                id: 'pete-test-history',
                title: 'Pipeline Expression Test Environment: Test History',
                summary: "Details on how to use the Test History feature of the Pipeline Expression Test Environment",
                categories: 'docs',
                markdown: testHistoryFeatureOverview
            }
        ]
    },
    getters: {
        documentationVisible(state){
            return state.documentationVisible;
        },
        documentationSliderPosition(state){
            return state.documentationSliderPosition;
        },
        documentationSliderWidth(state){
            return state.documentationSliderWidth;
        },
        viewDocumentation(state){
            if(state.viewDocumentation){
                let docItem = helpers.filterArrayByObjPropertyValue(state.availableDocumentation,'id',state.viewDocumentation)
                if(docItem.length > 0){
                    return docItem[0]['markdown'];
                } else {
                    return false;
                }

            } else {
                return state.viewDocumentation;
            }
        },
        availableDocumentation(state){
            return state.availableDocumentation;
        },
        standaloneDocumentation(state){
            return state.standaloneDocumentation;
        }
    },
    actions: {
        setDocumentationVisible(context,payload){
            context.commit("setDocumentationVisible",payload);
        },
        setDocumentationSliderPosition(context,payload){
            context.commit("setDocumentationSliderPosition",payload);
        },
        setDocumentationSliderWidth(context,payload){
            return new Promise ((resolve,reject)=>{
                context.commit("setDocumentationSliderWidth",payload);
                resolve(true)
            })
        },
        setViewDocumentation(context,payload){
            context.commit("setViewDocumentation",payload);
        },
        setStandaloneDocumentation(context,payload) {
            context.commit("setStandaloneDocumentation", payload);
        }
    },
    mutations: {
        setDocumentationVisible(state,payload){
            state.documentationVisible = payload;
        },
        setDocumentationSliderPosition(state,payload){
            state.documentationSliderPosition = payload;
        },
        setDocumentationSliderWidth(state,payload){
            state.documentationSliderWidth = payload;
        },
        setViewDocumentation(state, payload) {
            state.viewDocumentation = payload
        },
        setStandaloneDocumentation(state, payload) {
            state.standaloneDocumentation = payload;
        }
    }
}
