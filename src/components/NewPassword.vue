<template>
    <div
      class="flex flex-row justify-around items-center bg-zinc-800 w-[80vw] min-h-fit rounded-[50px]"
    >
      <div class=" hidden lg:block">
        <img
          src="../assets/images/people_icon.png"
          alt="todo list pic"
          class="w-[300px] opacity-80 rounded-xl"
        />
      </div>
      <div
        class="bg-zinc-800 min-w-[350px] min-h-fit flex flex-col justify-center items-center rounded-[50px]"
      >
        <form action="submit" @submit.prevent="signUp">
          <h1 class="text-violet-500 text-center mb-10 pb-[20px] pt-[200px])">Ironello</h1>
          <p class="mb-2 text-center text-xl">Please, write your new password!</p>
          <div class="text-center flex flex-col justify-center items-center">
          <!-- <input
            type="email"
            v-model="email"
            name="email"
            id="email"
            placeholder="   Enter your email"
            class="bg-zinc-700 py-3 px-3 my-4 rounded-lg w-[300px] placeholder:text-zinc-400 placeholder:text-[0.8em]"
          /> -->
          
          <input
            type="password"
            v-model="password"
            name="password"
            id="password"
            placeholder="   Enter your new password"
            class="bg-zinc-700 py-3 px-3 my-4 rounded-lg w-[300px] placeholder:text-zinc-400 placeholder:text-[0.8em]"
          />
          <input
            type="password"
            v-model="confirmpassword"
            name="password"
            id="password"
            placeholder="   Confirm your new password"
            class="bg-zinc-700 py-3 px-3 my-4 rounded-lg w-[300px] placeholder:text-zinc-400 placeholder:text-[0.8em]"
          />
        </div>
          <div class="text-center mb-[30px]">
            <button
              type="submit"
              @click="confirmPass(password, confirmpassword)"
              class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-8 py-2.5 text-center my-3 w-full"
            >
              Send new password
            </button>
          </div>
        </form>
      
        
      </div>
    </div>
  </template>
  
  <script>
  import { mapStores } from "pinia";
  import userStore from "../stores/user.js";
  
  export default {
    data() {
      return {
        email: "",
        password: "",
        confirmpassword: "",
      };
    },
    computed: {
      ...mapStores(userStore),
    },
    methods: {
      confirmPass(password, confirmpassword) {
        if (password === this.confirmpassword) {
            alert("passwords are the same")
           const path = this.$route.path
        } else {
            alert("The passwords are not the same, please enter the password again")
        }
      }
    },
  
  };
  </script>
  
  <style scoped>
  h1 {
    font-size: 4em;
    font-weight: 700;
  }
  
  </style>
  