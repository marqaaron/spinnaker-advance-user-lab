<template>
    <div v-if="!appConfig && !activeCover">
        <loading-screen></loading-screen>
    </div>
    <div v-else-if="!appConfig && activeCover">
        <cover></cover>
    </div>
    <div v-else>
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
import {envConfig} from "@/main";
import log from "@/core/utilities/log";
import alerts from "@/core/utilities/alerts";
import LoadingScreen from "@/core/layout/components/LoadingScreen";

export default {
    data () {
        return {

        }
    },
    created() {
        this.onWindowResize();
        window.addEventListener("resize",this.onWindowResize);
    },
    components: {
        'nav-bar': Navbar,
        'main-menu': MainMenu,
        'cover': Cover,
        'documentation': Documentation,
        'loading-screen': LoadingScreen
    },
    computed: {
        ...mapGetters([
            'activeCover',
            'minBrowserWidth',
            'pinMenu',
            'pinMenuBreakpoint',
            'mainContentAreaStyles',
            'displayTooSmallWatchBreakpoint',
            'releasesAvailable',
            'appConfig',
        ])
    },
    methods: {
        onWindowResize(e){
            if(e){
                this.windowWidth = e.currentTarget.innerWidth;
            } else {
                this.windowWidth = window.innerWidth;
            }
            if(this.windowWidth < this.displayTooSmallWatchBreakpoint){
                if(this.appConfig){
                    if(this.windowWidth < this.minBrowserWidth){
                        this.$store.dispatch('setActiveCover','displayTooSmall')
                    } else {
                        this.$store.dispatch('setActiveCover',null);
                    }
                    if(this.appConfig.BASE_DECK_URL === 'https://spinnaker.example.com' && envConfig.NODE_ENV === 'production'){
                        this.$store.dispatch('setActiveCover','missingBaseDeckUrlEnvVariable');
                    } else if(this.appConfig.BASE_GATE_URL === 'https://spinnaker.example.com' && envConfig.NODE_ENV === 'production'){
                        this.$store.dispatch('setActiveCover','missingBaseGateUrlEnvVariable');
                    }
                }
            }
            if(this.windowWidth < this.pinMenuBreakpoint && this.pinMenu){
                this.$store.dispatch('setPinMenu',false)
            }
            if(this.pinMenu){
                this.$store.dispatch('setWindowWidth',this.windowWidth);
            }

        }
    },
    watch: {
      appConfig(newVal){
          if(newVal){
              if(this.releasesAvailable){
                  this.$store.dispatch('getReleases').then(
                      (result)=>{
                          log.obj('Vuex getReleases Promise returned',result);
                      },
                      (error)=>{
                          this.$swal(alerts.endpointError(error));
                      }
                  );
              }
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
