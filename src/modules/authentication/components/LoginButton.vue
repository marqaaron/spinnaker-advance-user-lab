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
    export default {
        data() {
            return {

            }
        },
        created() {

        },
        computed: {

        },
        methods: {
            onLogin(){
                this.$store.dispatch('logIn');
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
