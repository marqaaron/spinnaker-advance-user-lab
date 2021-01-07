<template>
    <div class="toolbar-container">
        <div class="btn-group" v-if="viewDocumentation || viewDocumentation === false">
            <b-button variant="outline-danger" @click="onBackToList" show>Back to List</b-button>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
    name: "DocumentationContentToolbar",
    data() {
        return {

        }
    },
    created() {

    },
    computed: {
        ...mapGetters([
            'viewDocumentation'
        ]),
    },
    methods: {
        onBackToList(){
            this.$store.dispatch('setViewDocumentation',null);
        }
    },
    components: {

    }
}
</script>

<style scoped>

.toolbar-container {
    margin-bottom: 10px;
}

</style>
