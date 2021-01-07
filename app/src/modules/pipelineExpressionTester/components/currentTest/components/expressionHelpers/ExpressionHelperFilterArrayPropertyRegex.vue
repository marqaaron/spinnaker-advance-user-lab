<template>
    <b-row>
        <b-col>
            <label for="selectedElementMapFilteringRegex">Filter Array by Property Regex (Returns All Items)</label>
            <b-input-group>
                <b-form-input
                        id="selectedElementMapFilteringRegex"
                        :value="filterArrayByPropertyRegexSyntax"
                        disabled
                ></b-form-input>
                <b-input-group-append>
                    <b-button variant="outline-primary"
                              :title="insertCopyButtonTitle"
                              v-b-tooltip.hover
                              @click="onClickElementPathAction(filterArrayByPropertyRegexSyntax)"
                              block>
                        <font-awesome-icon :icon="insertCopyButton"
                        ></font-awesome-icon>
                    </b-button>
                </b-input-group-append>
            </b-input-group>
        </b-col>
    </b-row>
</template>

<script>
    import {mapGetters} from "vuex";
    import alerts from "@/core/utilities/alerts";
    export default {
        name: "ExpressionHelperFilterArrayPropertyRegex",
        data() {
            return {

            }
        },
        created() {

        },
        computed: {
            ...mapGetters([
                'selectedExecutionElementData',
                'selectedExecutionElementPathInsertMode'
            ]),
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
            },
            insertCopyButton(){
                if(this.selectedExecutionElementPathInsertMode){
                    return 'file-export';
                } else {
                    return 'copy';
                }
            },
            insertCopyButtonTitle(){
                if(this.selectedExecutionElementPathInsertMode){
                    return 'Insert at Cursor';
                } else {
                    return 'Copy Expression';
                }
            }
        },
        methods: {
            copyPath(_text){
                this.$copyText(_text);
                this.$swal(alerts.copySuccess());
            },
            insertPath(_text){
                this.$emit('emittedInsertText',_text);
            },
            onClickElementPathAction(_text){
                if(this.selectedExecutionElementPathInsertMode){
                    this.insertPath(_text);
                } else {
                    this.copyPath(_text);
                }
            }
        },
        components: {

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
