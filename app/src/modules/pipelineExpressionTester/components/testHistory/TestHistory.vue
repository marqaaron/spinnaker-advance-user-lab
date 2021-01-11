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
        </b-row>
        <test-history-list></test-history-list>
    </b-card>
</template>

<script>
    import {mapGetters} from "vuex";
    import DocumentationIconButton from "@/modules/documentation/components/DocumentationIconButton";
    import TestHistoryList from "@/modules/pipelineExpressionTester/components/testHistory/components/TestHistoryList";
    export default {
        name: "TestHistory",
        data() {
            return {

            }
        },
        created() {

        },
        computed: {
            ...mapGetters([

            ])
        },
        methods: {

        },
        components: {
            'documentation-icon': DocumentationIconButton,
            'test-history-list': TestHistoryList
        }
    }
</script>

<style scoped>

</style>
