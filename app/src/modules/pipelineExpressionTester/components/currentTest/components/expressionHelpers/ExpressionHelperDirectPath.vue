<template>
    <b-row>
        <b-col>
            <label for="selectedElementPath">Direct Path</label>
            <b-input-group>
                <b-form-input
                        id="selectedElementPath"
                        v-model="selectedExecutionElementData.path"
                        disabled
                ></b-form-input>
                <b-input-group-append>
                    <b-button variant="outline-primary"
                              :title="insertCopyButtonTitle"
                              v-b-tooltip.hover
                              @click="onClickElementPathAction(selectedExecutionElementData.path)"
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
        name: "ExpressionHelperDirectPath",
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
