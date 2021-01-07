<template>
    <div class="container-fluid">
        <p class="documentation-header text-center">Documentation & Help Guides</p>
        <hr>
        <toolbar></toolbar>
        <documentation-list v-if="viewDocumentation === null"></documentation-list>
        <placeholder v-else-if="viewDocumentation === false" variant="danger" message="This documentation does not exist."></placeholder>
        <markdown-viewer v-else :markdown="viewDocumentation"></markdown-viewer>
    </div>
</template>

<script>
import DocumentationContentToolbar from "@/modules/documentation/components/DocumentationContentToolbar";
import DocumentationList from "@/modules/documentation/components/DocumentationList";
import DocumentationMarkdownViewer from "@/modules/documentation/components/DocumentationMarkdownViewer";
import {mapGetters} from "vuex";
import Placeholder from "@/modules/shared/Placeholder";
export default {
    name: "DocumentationContent",
    data() {
        return {

        }
    },
    created() {

    },
    computed: {
        ...mapGetters([
            'viewDocumentation',
            'availableDocumentation'
        ])
    },
    methods: {

    },
    components: {
        'markdown-viewer' : DocumentationMarkdownViewer,
        'documentation-list': DocumentationList,
        'toolbar': DocumentationContentToolbar,
        'placeholder': Placeholder
    }
}
</script>

<style scoped>

.documentation-header {
    font-size: 2.0rem;
    font-weight: bolder;
}

</style>
