<template>
  <div class="padded-container">
    <b-row class="mt-4">
      <b-col cols="8" offset="2">
        <b-row>
          <b-col>
            <h4 class="text-center" v-if="form === 'forgot-username-form'">Request Account Reminder</h4>
            <h4 class="text-center" v-else-if="form === 'forgot-password-form'">Request Password Reset</h4>
            <h4 class="text-center" v-else>Welcome Back.</h4>
          </b-col>
        </b-row>
        <login-form v-if="form === 'login-form'"></login-form>
        <login-button v-else-if="form === 'login-button'"></login-button>
        <forgot-password-form v-else-if="form === 'forgot-password-form'"></forgot-password-form>
        <forgot-email-form v-else></forgot-email-form>
        <b-row class="mt-2">
          <b-col>
            <div v-if="form === 'login-form'">
              <b-button variant="outline-secondary" block @click="toggleForm('forgot-username-form')">Forgot Email</b-button>
              <b-button variant="outline-secondary" block @click="toggleForm('forgot-password-form')">Forgot Password</b-button>
            </div>
            <div v-else-if="form !== 'login-form' && form !== 'login-button'">
              <b-button variant="outline-secondary" block @click="toggleForm('login-form')">Back to Login</b-button>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import LoginForm from "@/modules/authentication/components/LoginForm";
  import ForgotPasswordForm from "@/modules/authentication/components/ForgotPasswordForm";
  import ForgotEmailForm from "@/modules/authentication/components/ForgotEmailForm";
  import LoginButton from "@/modules/authentication/components/LoginButton";

  export default {
    name: "Authentication",
    data() {
      return {
        form: 'login-form',
        activeMenu: 'authentication',
        defaultContent: 'login'
      }
    },
    created() {
      let activeContent = this.defaultContent;
      this.$store.dispatch('setActiveMenu',this.activeMenu);
      this.$store.dispatch('setActiveContent',activeContent);
      if(process.env.VUE_APP_AUTHENTICATION_TYPE === 'third_party_idp'){
        this.form = 'login-button';
      }
    },
    methods: {
      toggleForm(_value) {
        this.form = _value;
      }
    },
    computed: {
      ...mapGetters([
        'isLoggedIn',
        'redirects'
      ])
    },
    components: {
      'login-form': LoginForm,
      'forgot-password-form': ForgotPasswordForm,
      'forgot-email-form': ForgotEmailForm,
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
