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
    async fetchTasks() {
      console.log("entro en fetchtasks.js");
      const { data: tasks } = await supabase

        .from("tasks")

        .select("*")

        .order("id", { ascending: false });

      this.tasks = tasks;    
    
    },

    async createTask(userId,title,status) {
      console.log("entro en task.js createTask")
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
