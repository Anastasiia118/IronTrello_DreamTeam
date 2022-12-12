<template>
  Soy el Sign Up

  <form action="submit">
    <h1>TodoIron App</h1>
    <p>Register to be more efficient with your tasks!</p>
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
      name="password"
      id="password"
      placeholder="Enter your password"
    />
    <button>Sign Up!</button>
  </form>
</template>

<script>
import { mapStores } from "pinia";

export default {
  methods: {},
  data() {
    return {
      email: "",
    };
  },
  computed: {},
};
</script>
