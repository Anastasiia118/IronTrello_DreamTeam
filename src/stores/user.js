// /store/user.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";

export default defineStore("user", {
  state() {
    return {
      user: null,
      alreadyRegistered: false,
    };
  },

  actions: {
    async fetchUser() {
      const user = await supabase.auth.user();
      this.user = user;
    },
    async signUp(email, password) {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error){
        /* alert("You are already signed up! Just log in and that's it!") */
        this.alreadyRegistered = true
        this.$router.push("/Auth/signin")
      };
      
    },
    async signIn(email, password) {
        console.log("hola")
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        })
        console.log("es error", error)
        if (error) {
          return -2;
        } if (data) {
            this.user = data.user;
            console.log("this-router",this.$router)
            this.$router.push("/")
        }
      },

  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
      },
    ],
  },
});
