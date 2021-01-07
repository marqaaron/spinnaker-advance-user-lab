<template>
    <b-row>
        <b-col>
            <label for="propertyName">Property Name</label>
            <b-input-group>
                <b-form-input
                        id="propertyName"
                        :value="propertyName"
                        disabled
                ></b-form-input>
                <b-input-group-append
                        v-if="selectedExecutionElementPathInsertMode"
                >
                    <b-button variant="outline-primary"
                              title="Overwrite propertyName"
                              v-b-tooltip.hover
                              @click="onOverwritePropertyName(propertyName)"
                              block>
                        <font-awesome-icon icon="paste"
                        ></font-awesome-icon>
                    </b-button>
                </b-input-group-append>
                <b-input-group-append>
                    <b-button variant="outline-primary"
                              :title="insertCopyButtonTitle"
                              v-b-tooltip.hover
                              @click="onClickElementPathAction(propertyName)"
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
        name: "ExpressionHelperPropertyName",
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
            propertyName(){
                return this.selectedExecutionElementData.path.replace(/.*(\..*)$/,'$1').replace('.','');
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
            onOverwritePropertyName(_text){
                this.$emit('emittedOverwritePropertyName',_text);
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
