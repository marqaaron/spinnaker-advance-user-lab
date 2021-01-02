<template>
    <b-list-group-item
        class="test-history-item"
        :active="showingResults">
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
                              @click="onShowResults()"
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
        <b-row v-if="showingResults">
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
</template>

<script>
import {mapGetters} from "vuex";
import VueJsonPretty from "vue-json-pretty";
import alerts from "@/core/utilities/alerts";

export default {
    name: "TestHistoryListItem",
    props: {
        item: {
            type: Object,
            default(){
                return {};
            }
        },
        index: {
            type: Number,
            default(){
                return 0;
            }
        }
    },
    data() {
        return {
            showingResults: false
        }
    },
    created() {

    },
    computed: {
        ...mapGetters([

        ])
    },
    methods: {
        onShowResults(){
            this.showingResults = !this.showingResults;
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
        'vue-json-pretty': VueJsonPretty
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
    color:black;
}
.test-history-item:active{
    color:black;
}
</style>
