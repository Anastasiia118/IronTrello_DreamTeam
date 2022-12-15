<template>
  <div
    class="flex flex-row justify-around items-center bg-zinc-800 w-[80vw] h-[80vh] rounded-[50px]"
  >
    <div class="hidden lg:block">
      <img
        src="../assets/images/—Pngtree—planing business goal_6809959.png"
        alt="todo list pic"
        class="w-[300px] opacity-80 rounded-xl"
      />
    </div>
    <div
      class="bg-zinc-800 min-w-[350px] h-[100%] flex flex-col justify-center items-center rounded-[50px]"
    >
      <form action="submit" @submit.prevent="signIn">
        <h1 class="text-violet-500 text-center mb-10)">Ironello</h1>
        <div v-if="userStore.alreadyRegistered">
          You are already registered!
        </div>
        <p class="mb-2 text-center text-xl">Hello there! Welcome back</p>
        <div class="text-center flex flex-col justify-center items-center">
        <input
          type="email"
          v-model="email"
          name="email"
          id="email"
          placeholder="   Enter your email"
          class="bg-zinc-700 py-3 my-4 rounded-lg w-[300px] placeholder:text-zinc-400 placeholder:text-[0.8em]"
        />

        <input
          type="password"
          v-model="password"
          name="password"
          id="password"
          placeholder="   Enter your password"
          class="bg-zinc-700 py-3 my-4 rounded-lg w-[300px] placeholder:text-zinc-400 placeholder:text-[0.8em]"
        /> 
      </div>
      <div class="text-center">
        <button
          type="submit"
          class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-8 py-2.5 text-center my-3"
        >
          Log In!
        </button>
      </div>
      </form>
      <div v-if="errorOccured">Oops! Your email or password is wrong!</div>
      <div>
        No registered yet?
        <router-link to="/Auth/signup">
          <button type="submit" class="text-violet-400">Go to sign up!</button>
        </router-link>
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
      errorOccured: false,
    };
  },
  computed: {
    ...mapStores(userStore),
  },
  methods: {
    async signIn() {
      console.log("y ahora?");
      const response = await this.userStore.signIn(this.email, this.password);
      if (response === -2) {
        this.errorOccured = true;
      }
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 4em;
  font-weight: 700;
}

/* p {
  font-size: 0.8em;
} */
</style>
