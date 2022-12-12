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
        console.log(data, error)
        if (error) throw error;
        if (user) {
            this.user = user;
            console.log(data.user)
            console.log("voy a hacer el route")
            this.$router.push("/")
        }
        //si el user no existe - que salga para registrarse
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
  },
});
