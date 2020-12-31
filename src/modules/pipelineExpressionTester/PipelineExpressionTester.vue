<template>
    <div>
        <b-row class="mb-2">
            <b-col>
                <b-button-group class="btn-block">
                    <b-button :variant="setButtonClass('current')" @click="setTesterSection('current')">Current Test</b-button>
                    <b-button :variant="setButtonClass('history')" @click="setTesterSection('history')">Test History</b-button>
                </b-button-group>
            </b-col>
        </b-row>
        <current-test-section v-if="testerSection === 'current'" ></current-test-section>
        <test-history-section v-else></test-history-section>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import CurrentTest from "@/modules/pipelineExpressionTester/components/currentTest/CurrentTest";
    import TestHistory from "@/modules/pipelineExpressionTester/components/testHistory/TestHistory";
    export default {
        name: "PipelineExpressionTester",
        data() {
            return {
                message: 'Pipeline Expression Module Coming Soon!',
                activeMenu: 'home',
                defaultContent: 'pipeline-expression-tester'
            }
        },
        created() {
            /*let activeContent;
            if(typeof this.$route.params.activeContent != 'undefined'){
                activeContent = this.$route.params.activeContent;
            } else {
                activeContent = this.defaultContent;
            }*/
            //this.$store.dispatch('setActiveMenu',this.activeMenu);
            //this.$store.dispatch('setActiveContent',activeContent);
        },
        computed: {
            ...mapGetters([
                'isLoadingContent',
                'testerSection'
            ])
        },
        methods: {
            setButtonClass(_section){
                if(_section === this.testerSection){
                    return 'primary';
                } else {
                    return 'outline-primary';
                }
            },
            setTesterSection(_section){
                this.$store.dispatch("setTesterSection",_section);
            }
        },
        components: {
            'current-test-section': CurrentTest,
            'test-history-section': TestHistory
        }
    }
</script>

<style scoped>

</style>
