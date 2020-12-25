<template>
    <b-row>
        <b-col>
            <label for="propertyValue">Property Value</label>
            <b-input-group>
                <b-form-input
                        id="propertyValue"
                        :value="propertyValue"
                        disabled
                ></b-form-input>
                <b-input-group-append
                        v-if="selectedExecutionElementPathInsertMode"
                >
                    <b-button variant="outline-primary"
                              title="Overwrite propertyValue"
                              v-b-tooltip.hover
                              @click="onOverwritePropertyValue(propertyValue)"
                              block>
                        <font-awesome-icon icon="paste"
                        ></font-awesome-icon>
                    </b-button>
                </b-input-group-append>
                <b-input-group-append>
                    <b-button variant="outline-primary"
                              :title="insertCopyButton"
                              v-b-tooltip.hover
                              @click="onClickElementPathAction(propertyValue)"
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
        name: "ExpressionHelperPropertyValue",
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
            propertyValue(){
                if(typeof this.selectedExecutionElementData.data === 'boolean'){
                    return this.selectedExecutionElementData.data.toString();
                } else {
                    return this.selectedExecutionElementData.data;
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
            },
            onOverwritePropertyValue(_text){
                this.$emit('emittedOverwritePropertyValue',_text);
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
