<template>
    <b-navbar fixed="top"
              class="nav-bar"
              :style="navBarStyles">
        <b-navbar-brand>
            {{appName}} <b-badge variant="warning" size="xs" class="version-badge ml-3">{{ version }}</b-badge>
        </b-navbar-brand>
        <b-navbar-nav class="ml-auto text-right">
            <span class="mr-3 pointer nav-bar-pin-menu-icon" style="margin:auto"
                v-if="displayPinButton"
                :class="mainMenuPinActiveClass()"
                @click="togglePinMenu()"
                title="Pin Menu"
                v-b-tooltip.hover>
                <font-awesome-icon icon="thumbtack"
                                   size="lg"/>
            </span>
            <span class="nav-bar-menu-toggle">
                <b-icon icon="list"
                        class="pointer menu-toggle-icon ml-2 mr-3"
                        scale="2.25"
                        title="Toggle Menu"
                        v-b-tooltip.hover
                        v-b-toggle.sidebar-right
                ></b-icon>
            </span>
        </b-navbar-nav>
    </b-navbar>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    data () {
        return {
            displayPinButton: true,
            toggleIcon: 'hexagon'
        }
    },
    created() {
        this.displayPinButton = window.innerWidth >= this.pinMenuBreakpoint;
        window.addEventListener("resize",this.onWindowResize);
    },
    computed: {
        ...mapGetters([
            'pinMenu',
            'pinMenuBreakpoint',
            'navBarStyles',
            'appName'
        ]),
        version(){
            return (typeof process.env.VUE_APP_VERSION !== 'undefined') ? process.env.VUE_APP_VERSION : 'Dev';
        }
    },
    methods: {
        togglePinMenu(){
            if(this.pinMenu){
                this.$store.dispatch('setPinMenu',false);
                this.$store.dispatch('setWindowWidth',window.innerWidth);
            } else {
                this.$store.dispatch('setPinMenu',true);
                this.$store.dispatch('setWindowWidth',window.innerWidth);
            }
        },
        onWindowResize(e){
            this.displayPinButton = e.currentTarget.innerWidth >= this.pinMenuBreakpoint;
        },
        mainMenuPinActiveClass(){
            return {
                'active': this.pinMenu
            }
        }
    }
}
</script>

<style scoped>

.menu-toggle-icon:focus {
    outline: initial;
}

.version-badge {
    font-size:1.0rem;
    vertical-align: middle;
}

</style>
