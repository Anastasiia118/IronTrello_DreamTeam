<template>
  Soy el Sign Up

  <form action="submit" @submit.prevent="signUp">
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
      v-model="password"
      name="password"
      id="password"
      placeholder="Enter your password"
    />
    <button>Sign Up!</button>
  </form>
  <div>Already signed up?</div>
  <router-link to="/Auth/signin"> Go to sign in! </router-link>
</template>

<script>
import { mapStores } from 'pinia';
import userStore from '../stores/user.js';  

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
