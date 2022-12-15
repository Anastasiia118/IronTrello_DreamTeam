<template>
  <div
    class="bg-zinc-600 text-zinc-300 flex flex-row justify-between items-center"
  >
    <div class="ml-[20px] flex flex-row justify-start items-center">
      <img src="../assets/images/art.png" alt="logo" class="w-[50px]" />
      
      
      


      <ul class="ml-[10px]">
        <a href="#" class="mx-3">Home</a>
        <a href="#" class="mx-3">Dashboards</a>
        <a href="#" class="mx-3">Contact Us</a>
      </ul>
    </div>
    <div class="mr-[20px] flex flex-row items-center">
      <p class="mr-3">Welcome, {{userStore.user.email.substring(0, userStore.user.email.indexOf('@'))}} </p>
      <button
        @click="logOut()"
        class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-6 py-2.5 text-center my-3"
      >
        Log out!
      </button>
    </div> 
  </div>
</template>

<script>
import { mapStores } from "pinia";
import userStore from "../stores/user.js";
import { ref } from 'vue';

export default {
  setup() {
    let showMenu = ref(false);
    const toggleNav = () => (showMenu.value = !showMenu.value);
    return { showMenu, toggleNav };
  },
  computed: {
    ...mapStores(userStore),
   
  },
  data() {
    return {};
  },
  methods: {
    async logOut() {
      await this.userStore.signOut();
    },
    username() {
      return userStore.user.email
    }
  },
};
</script>
