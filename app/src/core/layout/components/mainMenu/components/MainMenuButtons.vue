<template>
  <div id="buttonContainer" class="mt-3">
    <div id="authProtectedButtons" v-if="isLoggedIn">
      <b-button variant="danger" size="sm" @click="logout()" block>Logout</b-button>
    </div>
    <div id="openButtons" class="mt-1">

    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import localStorage from "@/core/utilities/localStorage";
  import alerts from "@/core/utilities/alerts";

  export default {
    computed: {
      ...mapGetters([
        'isLoggedIn',
        'redirects'
      ])
    },
    methods: {
      logout(){
        this.$swal(alerts.confirmLogout()).then(
          (result) => {
            if(result.isConfirmed){
              this.$store.dispatch('logout').then(
                  ()=>{
                      localStorage.clear();
                      this.$router.push(this.redirects.logout);
                  },
                  (error)=>{
                      alerts.endpointError(error);
                  }
              );

            }
          }
        )
      }
    }
  }
</script>

<style scoped>

  #buttonContainer {
    padding: 5px 5px;
  }

</style>
