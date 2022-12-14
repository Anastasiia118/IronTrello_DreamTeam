<template>
    <button @click="logOut()">Log out!</button>
</template>

<script>
import { mapStores } from "pinia";
import userStore from "../stores/user.js";

export default {
  computed: {
    ...mapStores(userStore),
  },
  methods: {
   async logOut(){
        await this.userStore.signOut();
    }
  },
};
</script>
