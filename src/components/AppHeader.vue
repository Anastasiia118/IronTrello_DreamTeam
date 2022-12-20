<template>
  <div
    class="bg-zinc-700 text-zinc-300 flex flex-row justify-between items-center pt-[5px] pb-[5px]"
  >
    <div class="ml-[20px] flex flex-row  justify-between w-[100%] md:w-auto items-center">
      <div>
      <img src="../assets/images/art.png" alt="logo" class="w-[50px]" />
    </div>
    <div>
      <button @click="toggleDrop = !toggleDrop">
        <div class="space-y-2 block md:hidden ml-5 hover:bg-zinc-600 px-2 py-2">
          <span class="block w-8 h-0.5 bg-zinc-300"></span>
          <span class="block w-8 h-0.5 bg-zinc-300"></span>
          <span class="block w-5 h-0.5 bg-zinc-300"></span>
        </div>
      </button>
    </div>
      
      <ul class="ml-[10px] md:flex md:flex-row hidden">
        <li><a href="#" class="mx-3 hover:text-violet-400">Home</a></li>
        <li><a href="#" class="mx-3 hover:text-violet-400">Dashboards</a></li>
        <li><a href="#" class="mx-3 hover:text-violet-400">Contact Us</a></li>
      </ul>
      
    </div>
    <div class="mr-[20px] flex flex-row items-center">
      <p class="mr-3 text-zinc-100 text-xs md:block hidden">
        Welcome
        {{
          userStore.showName
        }}!
      </p>
      <button
        @click="logOut()"
        class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-6 py-2.5 text-center my-3 md:block hidden"
      >
        Log out
      </button>
      
    </div>
  </div>
  <div v-if="toggleDrop" class="bg-zinc-600 text-zinc-300 pb-[5px] block md:hidden">
  <ul class="flex flex-col items-end">
    
    <li><a href="#" class="mr-[15px] hover:text-violet-400">Home</a></li>
        <li><a href="#" class="mr-[15px] text-end hover:text-violet-400">Dashboards</a></li>
        <li><a href="#" class="mr-[15px] hover:text-violet-400">Contact Us</a></li>
        <li><button
        @click="logOut()"
        class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm my-2 px-4 py-1 text-center mr-3"
      >
        Log out
      </button></li>
      
  </ul> </div>
</template>

<script>
import { mapStores } from "pinia";
import userStore from "../stores/user.js";


export default {
  data() {
    return {
      toggleDrop: false,
      
    };
  },
  computed: {
    ...mapStores(userStore),
     
  },
  data() {
    return {};
  },
  methods: {
    async logOut() {
      const response = await this.userStore.signOut();
      
    },
    username() {
      return userStore.user.email;
    },
    
  },
};
</script>
