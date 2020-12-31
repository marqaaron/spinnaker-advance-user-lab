<template>
    <b-sidebar v-if="showSlider"
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
    <documentation-content v-else></documentation-content>
</template>

<script>
import DocumentationContent from "@/modules/documentation/components/DocumentationContent";
import DocumentationSliderFooterButtons from "@/modules/documentation/components/DocumentationSliderFooterButtons";
import {mapGetters} from "vuex";
export default {
    name: "Documentation",
    props: {
      standalone: {
          type: Boolean,
          default(){
              return false;
          }
      }
    },
    data() {
        return {

        }
    },
    created() {
        this.$nextTick(()=>{
            this.$store.dispatch('setStandaloneDocumentation', this.standalone);
        })
    },
    computed: {
        ...mapGetters([
            'documentationSliderPosition',
            'documentationSliderWidth',
            'standaloneDocumentation',
        ]),
        sliderPosition(){
            return this.documentationSliderPosition === 'right';
        },
        sliderBorder(){
            return this.documentationSliderPosition === 'right' ? 'border-left' : 'border-right'
        },
        showSlider(){
            return this.standalone === false;
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
