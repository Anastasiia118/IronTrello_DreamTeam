<template>
  Dashboard
  <button @click="login"></button>
</template>

<script>
import { mapStores } from "pinia";
/* import { userStore } from "../stores/user.js"; */

export default {
  computed: {
    ...mapStores(""),
  },
  methods: {
    login() {
      this.userStore.singUp();
    },
  },
};
</script>
