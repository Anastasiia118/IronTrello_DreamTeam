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
      if (error) {
        this.alreadyRegistered = true;
        this.$router.push("/Auth/signin");
      }
      if (data) {
        alert("Please note that a verification email has been sent to the email address you have registered.")
        this.$router.push("/Auth/signin");
      }
    },
    async signIn(email, password) {
      console.log("hola");
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      console.log("es error", error);
      if (error) {
        return -2;
      }
      if (data) {
        this.user = data.user;
        this.$router.push("/");
      }
    },
    async signOut() {
      const { error } = await supabase.auth.signOut();
      this.user = null;
      this.$router.push("/Auth/signin")
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
