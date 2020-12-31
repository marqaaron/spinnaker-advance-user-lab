<template>
    <b-sidebar
        id="documentationSidebar"
        @shown="onShowDocumentation()"
        @hidden="onHideDocumentation()"
        :width="documentationSliderWidth"
        :sidebar-class="sliderBorder"
        :shadow="true"
        :right="sliderPosition">
        <documentation-content></documentation-content>
        <template v-slot:footer>
            <footer-buttons></footer-buttons>
        </template>
    </b-sidebar>
</template>

<script>
import DocumentationContent from "@/modules/documentation/components/DocumentationContent";
import DocumentationSliderFooterButtons from "@/modules/documentation/components/DocumentationSliderFooterButtons";
import {mapGetters} from "vuex";
export default {
    name: "Documentation",
    data() {
        return {

        }
    },
    created() {

    },
    computed: {
        ...mapGetters([
            'documentationSliderPosition',
            'documentationSliderWidth'
        ]),
        sliderPosition(){
            return this.documentationSliderPosition === 'right';
        },
        sliderBorder(){
            return this.documentationSliderPosition === 'right' ? 'border-left' : 'border-right'
        }
    },
    methods: {
        onShowDocumentation(){
            this.$store.dispatch("setDocumentationVisible",true);
        },
        onHideDocumentation(){
            this.$store.dispatch("setDocumentationVisible",false);
        }
    },
    components: {
        'documentation-content': DocumentationContent,
        'footer-buttons': DocumentationSliderFooterButtons
    }
}
</script>

<style scoped>

</style>
