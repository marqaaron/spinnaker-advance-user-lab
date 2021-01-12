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
                    <b-button variant="success" @click="onLogin" :disabled="isRequestingUser || loggingIn">
                        <font-awesome-icon icon="sync"
                                           v-if="isRequestingUser || loggingIn"
                                           :spin="isRequestingUser || loggingIn"
                        ></font-awesome-icon>
                        Login
                    </b-button>
                </b-button-group>
                <p v-if="isRequestingUser" class="mt-2 auto-login-text">Attempting to Auto Login...</p>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
    data() {
        return {
            loggingIn: false
        }
    },
    created() {

    },
    computed: {
        ...mapGetters([
            'isRequestingUser'
        ])
    },
    methods: {
        onLogin(){
            this.loggingIn = true;
            setTimeout(()=>{
                this.$store.dispatch('logIn');
            },500)
        }
    },
    components: {

    },
    watch: {

    }
}
</script>

<style scoped>
    #loginButtonContainer{
        margin-top:25px;
    }
    .auto-login-text {
        font-size:1.2rem;
        color:grey;
        text-align: center;
    }
</style>
