<template>
    <div>
        <b-container id="app" fluid="true" class="app-container"
                     :style="mainContentAreaStyles">
            <nav-bar></nav-bar>
            <router-view></router-view>
        </b-container>
        <main-menu></main-menu>
        <cover v-if="activeCover != null"></cover>
        <documentation></documentation>
    </div>
</template>

<script>
import Navbar from "@/core/layout/components/Navbar";
import MainMenu from "@/core/layout/components/mainMenu/MainMenu";
import Cover from "@/core/layout/components/Cover";
import {mapGetters} from "vuex";
import Documentation from "@/modules/documentation/Documentation";

export default {
    data () {
        return {
            message: 'Application Home Page.'
        }
    },
    created() {
        this.windowWidth = window.innerWidth;
        if(this.windowWidth < this.minBrowserWidth){
            this.$store.dispatch('setActiveCover','displayTooSmall');
        } else {
            this.$store.dispatch('setActiveCover',null);
        }
        if(typeof process.env.VUE_APP_BASE_DECK_URL === 'undefined'){
            this.$store.dispatch('setActiveCover','missingBaseDeckUrlEnvVariable');
        } else if(typeof process.env.VUE_APP_BASE_GATE_URL === 'undefined'){
            this.$store.dispatch('setActiveCover','missingBaseGateUrlEnvVariable');
        }
        this.$store.dispatch('setWindowWidth',this.windowWidth);
        window.addEventListener("resize",this.onWindowResize);
    },
    components: {
        'nav-bar': Navbar,
        'main-menu': MainMenu,
        'cover': Cover,
        'documentation': Documentation
    },
    computed: {
        ...mapGetters([
            'activeCover',
            'minBrowserWidth',
            'pinMenu',
            'pinMenuBreakpoint',
            'mainContentAreaStyles',
            'displayTooSmallWatchBreakpoint'
        ])
    },
    methods: {
        onWindowResize(e){
            this.windowWidth = e.currentTarget.innerWidth;
            if(this.windowWidth < this.displayTooSmallWatchBreakpoint){
                if(this.windowWidth < this.minBrowserWidth){
                    this.$store.dispatch('setActiveCover','displayTooSmall')
                } else {
                    this.$store.dispatch('setActiveCover',null);
                }
                if(typeof process.env.VUE_APP_BASE_DECK_URL === 'undefined'){
                    this.$store.dispatch('setActiveCover','missingBaseDeckUrlEnvVariable');
                } else if(typeof process.env.VUE_APP_BASE_GATE_URL === 'undefined'){
                    this.$store.dispatch('setActiveCover','missingBaseGateUrlEnvVariable');
                }
            }
            if(this.windowWidth < this.pinMenuBreakpoint && this.pinMenu){
                this.$store.dispatch('setPinMenu',false)
            }
            if(this.pinMenu){
                this.$store.dispatch('setWindowWidth',this.windowWidth);
            }

        }
    }
}
</script>

<style>

.app-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-x: hidden;
    overflow-y: auto;
}

</style>
