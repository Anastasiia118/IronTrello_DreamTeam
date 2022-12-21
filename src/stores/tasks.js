// /store/task.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";

export default defineStore("tasks", {
  state() {
    return {
      tasks: [],
    };
  },

  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase

        .from("tasks")

        .select("*")

        .order("order", { ascending: true });

      this.tasks = tasks;    
    
    },

    async createTask(userId,title,status, order) {
      const response = await supabase
      .from("tasks")
      .insert({
        'user_id': userId,
        'title': title,
        'status': status,
        'order': order,
       });
    },

    async deleteTask(taskId) {
      //console.log("entro en delete de taskjs")
      const response = await supabase
      .from("tasks")
      .delete()
      .match({'id': taskId})
     // console.log("voy a hacer fetch en delete")
      const response2 = await this.fetchTasks();
    },
    async deleteColTasks(status) {
      //console.log("entro en delete de taskjs")
      const response = await supabase
      .from("tasks")
      .delete()
      .match({'status': status})
     // console.log("voy a hacer fetch en delete")
      const response2 = await this.fetchTasks();
    },
    
    async updateTask(taskId, editTitle) {
     // console.log("entro en updateTask tasks js")
      const {error} = await supabase
      .from("tasks")
      .update({'title' : editTitle})
      .match({'id': taskId})
      //console.log("voy a fetchtasks")
      const response2 = await this.fetchTasks();  
    },

    async updateStatus(taskID, editStatus){
      const {error} = await supabase
      .from("tasks")
      .update({'status': editStatus})
      .match({'id': taskID})
      const response = await this.fetchTasks();
    },
    async updateOrder(taskID, editOrder){
      const {error} = await supabase
      .from("tasks")
      .update({'order': editOrder})
      .match({'id': taskID})
      const response = await this.fetchTasks();
    },
  },
getters: {
  todoArr() {
    return this.tasks.filter((task) => task.status === 0);
    
  },
  ongoingArr() {
    const rep = this.tasks.filter((task) => task.status === 1);
    return rep;
  },
  doneArr() {
    const rep = this.tasks.filter((task) => task.status === 2);
    return rep;
  },
},
  
});
