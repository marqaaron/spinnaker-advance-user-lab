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
import {appConfig} from "@/main";
import {envConfig} from "@/main";
import log from "@/core/utilities/log";
import alerts from "@/core/utilities/alerts";

export default {
    data () {
        return {
            message: 'Application Home Page.'
        }
    },
    created() {
        log.obj('Environment Config', envConfig);
        log.obj('App Config', appConfig);
        this.windowWidth = window.innerWidth;
        if(this.windowWidth < this.minBrowserWidth){
            this.$store.dispatch('setActiveCover','displayTooSmall');
        } else {
            this.$store.dispatch('setActiveCover',null);
        }
        if(appConfig.BASE_DECK_URL === 'https://spinnaker.example.com' && envConfig.NODE_ENV === 'production'){
            this.$store.dispatch('setActiveCover','missingBaseDeckUrlEnvVariable');
        } else if(appConfig.BASE_GATE_URL === 'https://spinnaker.example.com' && envConfig.NODE_ENV === 'production'){
            this.$store.dispatch('setActiveCover','missingBaseGateUrlEnvVariable');
        }
        this.$store.dispatch('setWindowWidth',this.windowWidth);
        window.addEventListener("resize",this.onWindowResize);
        if(this.releasesAvailable){
            this.$store.dispatch('getReleases').then(
                (response)=>{
                    log.obj('Releases',response);
                },
                (reject)=>{
                    this.$swal(alerts.genericError(reject.title,reject.message));
                }
            );
        }
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
            'displayTooSmallWatchBreakpoint',
            'releasesAvailable'
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
                if(appConfig.BASE_DECK_URL === 'https://spinnaker.example.com' && envConfig.NODE_ENV === 'production'){
                    this.$store.dispatch('setActiveCover','missingBaseDeckUrlEnvVariable');
                } else if(appConfig.BASE_GATE_URL === 'https://spinnaker.example.com' && envConfig.NODE_ENV === 'production'){
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
