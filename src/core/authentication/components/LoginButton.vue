<template>
    <div id="loginButtonContainer">
        <b-row>
            <b-col
                sm="10"
                offset-sm="1"
                md="8"
                offset-md="2"
                lg="6"
                offset-lg="3"
            >
                <b-button-group class="btn-block">
                    <b-button variant="success" @click="onLogin">Login</b-button>
                </b-button-group>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import gateEndpoints from "@/core/authentication/store/gateEndpoints";
    export default {
        data() {
            return {
                msg: "Login Button Coming Soon!",
            }
        },
        created() {

        },
        computed: {

        },
        methods: {
            onLogin(){
                window.open(gateEndpoints.loginRedirectUrl(process.env),'_self');
            }
        },
        components: {},
        watch: {}
    }
</script>

<style scoped>
    #loginButtonContainer{
        margin-top:25px;
    }
</style>
