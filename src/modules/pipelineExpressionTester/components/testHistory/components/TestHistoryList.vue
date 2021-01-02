<template>
    <b-row>
        <b-col cols="12" v-if="expressionEvaluationHistory.length > 0">
            <b-list-group>
                <test-history-item
                    v-for="(item,index) in expressionEvaluationHistory"
                    :item="item"
                    :key="index">
                </test-history-item>
            </b-list-group>
        </b-col>
        <b-col v-else>
            <b-alert variant="secondary" show>No Test History to Display!</b-alert>
        </b-col>
    </b-row>
</template>

<script>
import {mapGetters} from "vuex";
import TestHistoryListItem
    from "@/modules/pipelineExpressionTester/components/testHistory/components/TestHistoryListItem";
export default {
    name: "TestHistoryList",
    data() {
        return {

        }
    },
    created() {

    },
    computed: {
        ...mapGetters([
            'expressionEvaluationHistory'
        ])
    },
    methods: {

    },
    components: {
        'test-history-item': TestHistoryListItem
    }
}
</script>

<style scoped>

</style>
