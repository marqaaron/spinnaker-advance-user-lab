<template>
    <div class="buttons-container">
        <div class="btn-group">
            <b-button :variant="positionButtonVariant('left')" @click="setPosition('left')">Left</b-button>
            <b-button :variant="positionButtonVariant('right')" @click="setPosition('right')">Right</b-button>
        </div>
        <div class="btn-group ml-2">
            <b-button :variant="widthButtonVariant('100%')" @click="setWidth('100%')">100%</b-button>
            <b-button :variant="widthButtonVariant('50%')" @click="setWidth('50%')">50%</b-button>
            <b-button :variant="widthButtonVariant('33%')" @click="setWidth('33%')">33%</b-button>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
    name: "DocumentationSliderFooterButtons",
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
    },
    methods: {
        setPosition(_position){
            this.$store.dispatch('setDocumentationSliderPosition',_position);
        },
        positionButtonVariant(_position){
            if(_position === this.documentationSliderPosition){
                return 'info'
            } else {
                return 'outline-info'
            }
        },
        setWidth(_width){
            this.$store.dispatch('setDocumentationSliderWidth',_width).then(
                ()=>{
                    this.$store.dispatch('setPaginationContainerWidth',true)
                }
            );
        },
        widthButtonVariant(_width){
            if(_width === this.documentationSliderWidth){
                return 'info'
            } else {
                return 'outline-info'
            }
        },
    },
    components: {

    }
}
</script>

<style scoped>
.buttons-container {
    padding: 5px;
}
</style>
