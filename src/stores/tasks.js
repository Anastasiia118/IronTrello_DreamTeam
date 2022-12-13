// /store/task.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";

export default defineStore("tasks", {
  state() {
    return {
      tasks: null,
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
      console.log(tasks);
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
