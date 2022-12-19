// /store/user.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";

export default defineStore("user", {
  state() {
    return {
      user: null,
      alreadyRegistered: false,
      variable: {},
      
    };
  },

  actions: {
    async fetchUser() {
      const user = await supabase.auth.getUser();
      this.user = user.data.user;
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
        // alert("Please note that a verification email has been sent to the email address you have registered.")
        this.$router.push("/Auth/signin");
      }
    },
    async signInWithGitHub() {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',        
      })
      if (error) {
        throw error
      }if (data) {
        
        this.user = response.data.user;
        
        
      }
    },
    async signIn(email, password) {
     
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      
      if (error) {
        return -2;
      }
      if (data) {
        this.user = data.user;
        this.$router.replace("/");
      }
    },
    async signOut() {
      console.log("entro en signout")
      const { error } = await supabase.auth.signOut();
      this.user = null;
      console.log(this.user)
      this.$router.push("/Auth/signin");
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
