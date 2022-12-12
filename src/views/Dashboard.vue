<template>
  Dashboard
  <button @click="login">Login!</button>
</template>

<script>
import { mapStores } from "pinia";
/* import { userStore } from "../stores/user.js"; */

export default {
  computed: {
    //esto hay que mirarlo, userStores daba error
    ...mapStores(""),
  },
  methods: {
    login() {
      this.userStore.singUp();
    },
  },
};
</script>
