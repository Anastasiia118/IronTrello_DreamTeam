<template>
  Soy el Sign In

  <form action="submit" @submit.prevent="signIn">
    <h1>TodoIron App</h1>
    <p>SIGN IN</p>
    <input
      type="email"
      v-model="email"
      name="email"
      id="email"
      placeholder="Enter your email"
    />
    <br />
    <input
      type="password"
      v-model="password"
      name="password"
      id="password"
      placeholder="Enter your password"
    />
    <button>Log In!</button>
  </form>
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
    signIn() {
      console.log("y ahora?");
      this.userStore.signIn(this.email, this.password);
    },
  },
};
</script>
