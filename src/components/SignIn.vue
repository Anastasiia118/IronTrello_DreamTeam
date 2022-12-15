<template>
  <form action="submit" @submit.prevent="signIn">
    <h1>TodoIron App</h1>
    <div v-if="userStore.alreadyRegistered">You are already registered!</div>
    <p>SIGN IN</p>
    <input
      type="email"
      v-model="email"
      name="email"
      id="email"
      placeholder="Enter your email"
    />
    
    <input
      type="password"
      v-model="password"
      name="password"
      id="password"
      placeholder="Enter your password"
    />
    <button>Log In!</button>
  </form>
  <div v-if="errorOccured">Oops! Your email or password is wrong!</div>
  <div>No registered yet?</div>
  <router-link to="/Auth/signup"> Go to sign up! </router-link>
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
      if( response === -2){
        this.errorOccured = true;
      }
    },
  },
};
</script>
