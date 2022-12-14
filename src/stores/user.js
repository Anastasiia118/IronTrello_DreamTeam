// /store/user.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";

export default defineStore("user", {
  state() {
    return {
      user: null,
      
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
      if (error) throw error;
      
    },
    async signIn(email, password) {
        console.log("hola")
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        })
        console.log("es data",data, error)
        if (error) {
          throw error;
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
