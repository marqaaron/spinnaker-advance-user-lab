<template>
    <span class="pointer documentation-icon-button"
          style="margin:auto"
          title="Documentation"
          @click="onClickIcon(docId)"
          v-b-toggle.documentationSidebar
          :disabled="documentationVisible"
          v-b-tooltip.hover>
        <font-awesome-icon icon="question-circle"/>
    </span>
</template>

<script>
import {mapGetters} from "vuex";
export default {
    name: "DocumentationIconButton",
    props: {
      'docId': {
          type: String
      }
    },
    data() {
        return {

        }
    },
    created() {

    },
    computed: {
        ...mapGetters([
            'documentationVisible'
        ]),
    },
    methods: {
        onClickIcon(_value){
            this.$store.dispatch('setViewDocumentation',_value);
        }
    },
    components: {

    }
}
</script>

<style scoped>

.documentation-icon-button {
    color: #546778;
}

</style>
