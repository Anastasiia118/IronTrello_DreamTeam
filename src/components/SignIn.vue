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
    };
  },
  computed: {
    ...mapStores(userStore),
  },
  methods: {
    async signIn() {
      console.log("y ahora?");
      const response = await this.userStore.signIn(this.email, this.password);
      //if el return es error (-1)
      console.log(typeof response);
      console.log(response);
      if (response === 0) {
        this.$router.push("/Dashboard");
      } else if (response === -1) {
        alert("error!!");
      }
    },
  },
};
</script>
