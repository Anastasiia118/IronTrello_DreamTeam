// /store/task.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";

export default defineStore("tasks", {
  state() {
    return {
      tasks: {},
    };
  },

  actions: {
    async fetchTasks(userId) {
      console.log("entro en fetchtasks.js");
      const { data: tasks } = await supabase

        .from("tasks")

        .select("*")
        //.eq("user_id", "33bfbbf8-aa44-4c18-9fc3-3a2a8262b6c6")
        .eq("user_id", userId)

        .order("id", { ascending: false });

      this.tasks = tasks;    
    
    },

    async createTask(userId,title,status) {
      const response = await supabase
      .from("tasks")
      .insert({
        'user_id': userId,
        'title': title,
        'status': status,
       });
    }
  },
});
