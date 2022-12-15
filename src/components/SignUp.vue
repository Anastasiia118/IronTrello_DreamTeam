<template>
  <div
    class="flex flex-row justify-around items-center bg-zinc-800 w-[80vw] min-h-fit rounded-[50px]"
  >
    <div class=" hidden lg:block">
      <img
        src="../assets/images/—Pngtree—planing business goal_6809959.png"
        alt="todo list pic"
        class="w-[300px] opacity-80 rounded-xl"
      />
    </div>
    <div
      class="bg-zinc-800 min-w-[350px] h-[80vh] flex flex-col justify-center items-center rounded-[50px]"
    >
      <form action="submit" @submit.prevent="signUp">
        <h1 class="text-violet-500 text-center mb-10 pb-[50px] pt-[200px])">Ironello</h1>
        <p class="mb-2 text-center">Create a new account</p>
        <div class="text-center flex flex-col justify-center items-center">
        <input
          type="email"
          v-model="email"
          name="email"
          id="email"
          placeholder="   Enter your email"
          class="bg-zinc-700 py-3 px-3 my-4 rounded-lg w-[300px] placeholder:text-zinc-400 placeholder:text-[0.8em]"
        />
        
        <input
          type="password"
          v-model="password"
          name="password"
          id="password"
          placeholder="   Enter your password"
          class="bg-zinc-700 py-3 px-3 my-4 rounded-lg w-[300px] placeholder:text-zinc-400 placeholder:text-[0.8em]"
        />
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
      <div class="items-center mt-4 mb-6">
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
    };
  },
  computed: {
    ...mapStores(userStore),
  },
  methods: {
    signUp() {
      this.userStore.signUp(this.email, this.password);
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 4em;
  font-weight: 700;
}

</style>
