<template>
    <div class="padded-container">
        <b-row class="mt-4">
            <b-col cols="8" offset="2">
                <b-row>
                    <b-col>
                        <h4 class="text-center">Welcome Back.</h4>
                    </b-col>
                </b-row>
                <login-button></login-button>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import LoginButton from "@/modules/authentication/components/LoginButton";

export default {
    name: "Authentication",
    data() {
        return {
            activeMenu: 'authentication',
            defaultContent: 'login'
        }
    },
    created() {
        let activeContent = this.defaultContent;
        this.$store.dispatch('setActiveMenu',this.activeMenu);
        this.$store.dispatch('setActiveContent',activeContent);
    },
    methods: {

    },
    computed: {
        ...mapGetters([
            'isLoggedIn',
            'isRequestingUser',
            'redirects'
        ])
    },
    components: {
        'login-button': LoginButton
    },
    watch: {
        isLoggedIn: function(_value){
            if(_value){
                this.$router.push(this.redirects.login);
            }
        }
    }
}
</script>

<style scoped>

</style>
