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
        <p class="mb-2 text-center text-xl">Create a new account</p>
        <div class="text-center flex flex-col justify-center items-center">
        <input
          type="email"
          v-model="email"
          name="email"
          id="email"
          placeholder="   Enter your email"
          class="bg-zinc-700 py-3 px-3 my-2 rounded-lg w-[300px] placeholder:text-zinc-400 placeholder:text-[0.8em]"
        />
        <div
            class="bg-zinc-700 my-2 rounded-lg w-[300px] flex flex-row justify-between items-center relative"
          >
            <input v-if="viewPass"
              type="password"
              v-model="password"
              name="password"
              id="password"
              placeholder="   Enter your new password"
              class="bg-zinc-700 px-3 py-3 w-[300px] rounded-lg placeholder:text-zinc-400 placeholder:text-[0.8em]"
            />
            <input v-if="!viewPass"
              type="text"
              v-model="password"
              name="password"
              id="password"
              placeholder="   Enter your new password"
              class="bg-zinc-700 w-[300px] px-3 py-3 rounded-lg placeholder:text-zinc-400 placeholder:text-[0.8em]"
            />
            <button v-if="viewPass" @click="switchViewPass"> 
              <img
                src="../assets/images/view.png"
                alt="view"
                class="w-[20px]  opacity-50 hover:opacity-100 absolute ml-[-40px] mt-[-10px]" 
            /></button>
            <button v-if="!viewPass" @click="switchViewPass"> 
              <img
                src="../assets/images/hide.png"
                alt="view"
                class="w-[20px]  opacity-50 hover:opacity-100 absolute ml-[-40px] mt-[-10px]" 
            /></button>
          </div>
          <div
            class="bg-zinc-700 my-2 rounded-lg w-[300px] flex flex-row justify-between items-center relative"
          >
            <input v-if="viewPass1"
              type="password"
              v-model="confirmPassword"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="   Enter your new password"
              class="bg-zinc-700 px-3 py-3 w-[300px] rounded-lg placeholder:text-zinc-400 placeholder:text-[0.8em]"
            />
            <input v-if="!viewPass1"
              type="text"
              v-model="confirmPassword"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="   Confirm your new password"
              class="bg-zinc-700 w-[300px] px-3 py-3 rounded-lg placeholder:text-zinc-400 placeholder:text-[0.8em]"
            />
            <button v-if="viewPass1" @click="switchViewPass1"> 
              <img
                src="../assets/images/view.png"
                alt="view"
                class="w-[20px]  opacity-50 hover:opacity-100 absolute ml-[-40px] mt-[-10px]" 
            /></button>
            <button v-if="!viewPass1" @click="switchViewPass1"> 
              <img
                src="../assets/images/hide.png"
                alt="view"
                class="w-[20px]  opacity-50 hover:opacity-100 absolute ml-[-40px] mt-[-10px]" 
            /></button>
          </div>
       
      </div>
        <div class="text-center">
          <button
            type="submit"
            class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-8 py-2.5 text-center my-3 w-full"
          >
            Sign Up!
          </button>
        </div>
      </form>
      <div class="items-center mt-4 mb-4">
        <p>
          Already a member?
          <span>
            <router-link to="/Auth/signin"
              ><button type="submit" class="text-violet-400 hover:text-blue-400">
                Log in
              </button></router-link
            ></span
          >
        </p>
      </div>
      <div class="opacity-30 w-[300px] flex flex-row items-center justify-between">
        <hr class="w-[120px]">
          <p class="text-sm"> OR</p>
          <hr class="w-[120px]">
      </div>
      <button type="submit" @click="signInGit" class="opacity-50 hover:opacity-100 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm w-[300px] py-[1px] text-center mt-3 mb-[40px] flex flex-row items-center justify-center"> 
        <img src="../assets/images/github.png" alt="github icon" class="w-[40px]"> 
        <p> Sign Up with Github  </p>
        
      
      </button>
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
      confirmPassword: "",
      viewPass: false,
      viewPass1: false,
    };
  },
  computed: {
    ...mapStores(userStore),
  },
  methods: {
    signUp() {
      
      if (this.password.length>5 && this.password === this.confirmPassword) {
            this.userStore.signUp(this.email, this.password)
        } else if (this.password.length<5) {
            alert("The password must have min. 6 characters")
        } else if (this.password !== this.confirmPassword) {
          alert("The confirmation password is not correct, please enter the password again")
        }
      
    },
    async signInGit() {
      const response = await this.userStore.signInWithGitHub();
      this.$router.replace("/");
    },
    switchViewPass() {
      
      this.viewPass = !this.viewPass;
    },
    switchViewPass1() {
      this.viewPass1 = !this.viewPass1
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
