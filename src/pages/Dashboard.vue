<template>
  Dashboard <br>
  <router-link to="/Auth"> Ir a Auth </router-link> <br>
  <button @click="login">Login!</button>
</template>

<script>
import { mapStores } from "pinia";

/* import { userStore } from "../stores/user"; */  

export default {
  computed: {
    //esto hay que mirarlo, userStores daba error
    ...mapStores(""),
  },
  methods: {
    login() {
      this.userStore.signUp();
    },
  },
};
</script>
