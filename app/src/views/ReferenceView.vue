<template>
    <div class="padded-container" v-if="!isLoadingContent">
        <placeholder v-if="false" variant="success" message="Documentation Coming Soon!"></placeholder>
        <documentation v-if="activeContent === 'documentation'" :standalone="true"> </documentation>
    </div>
    <div v-else>
        <loading-screen></loading-screen>
    </div>
</template>

<script>
import LoadingScreen from "@/core/layout/components/LoadingScreen";
import {mapGetters} from "vuex";
import helpers from "@/core/utilities/helpers";
import Placeholder from "@/modules/shared/Placeholder";
import Documentation from "@/modules/documentation/Documentation";
export default {
    name: "ReferenceView",
    data() {
        return {
            activeMenu: 'references',
            defaultContent: 'documentation',
            availableContent: [
                'documentation'
            ]
        }
    },
    created() {
        this.setActiveContent();
    },
    destroyed() {
        this.$store.dispatch('setStandaloneDocumentation', false);
    },
    computed: {
        ...mapGetters([
            'isLoadingContent',
            'activeContent'
        ])
    },
    methods: {
        setActiveContent(){
            let activeContent;
            if(typeof this.$route.params.activeContent !== 'undefined'){
                activeContent = this.$route.params.activeContent;
                this.$store.dispatch('setActiveMenu',this.activeMenu);
                this.$store.dispatch('setActiveContent',activeContent);
                if(!helpers.validContent(this.availableContent,activeContent)){
                    this.$router.replace('/' + this.activeMenu + '/' + this.defaultContent);
                }
                if(helpers.queryPresent(this.$route.query)){
                    if(typeof this.$route.query.docId !== 'undefined'){
                        this.$store.dispatch('setViewDocumentation',this.$route.query.docId);
                    }
                }
            } else {
                this.$router.replace('/' + this.activeMenu + '/' + this.defaultContent);
            }
        }
    },
    components: {
        'loading-screen': LoadingScreen,
        'placeholder': Placeholder,
        'documentation': Documentation
    },
    watch: {
        $route(){
            this.setActiveContent();
        }
    }
}
</script>

<style scoped>

</style>
