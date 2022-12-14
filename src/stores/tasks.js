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
      const { data: tasks } = await supabase

        .from("tasks")

        .select("*")

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
    },

    async deleteTask(taskId) {
      console.log("entro en delete de taskjs")
      const response = await supabase
      .from("tasks")
      .delete()
      .match({'id': taskId})
    },
    async updateTask(taskId, editTitle) {
      console.log("entro en updateTask tasks js")
      const {error} = await supabase
      .from("tasks")
      .update({'title' : editTitle})
      .match({'id': taskId})
      //.select()
      
      console.log("dentro de update task")
      //console.log(this.tasksStore.tasks)
    },
  },

  
});
