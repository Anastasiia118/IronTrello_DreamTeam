// /store/columns.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";

export default defineStore("columns", {
state () {
    return {
        columns: []
    }
},

actions: {
    async fetchColumns() {
        const {data: columns} = await supabase

        .from("columns")

        .select("*")

        .order("id", {ascending: true});

        this.columns = columns;
        console.log(this.columns)
    },

    async createColumn(userId,title,status, order) {
      console.log("entro en create col column js")
        const response = await supabase
        .from("columns")
        .insert({
          'user_id': userId,
          'title': title,
          'status': status,
          'order': order
         });
      },
      async deleteColumn(columnId) {
        //console.log("entro en delete de columnjs")
        const response = await supabase
        .from("columns")
        .delete()
        .match({'id': columnId})

        
       // console.log("voy a hacer fetch en delete")
        const response2 = await this.fetchColumns();
      },
      async deleteAllColumns(userId) {
        //console.log("entro en delete de columnjs")
        const response = await supabase
        .from("columns")
        .delete()
        .match({'user_id': userId})
       // console.log("voy a hacer fetch en delete")
        const response2 = await this.fetchColumns();
      },
      async updateColTitle(columnId, editTitle) {
        // console.log("entro en updateTask column js")
         const {error} = await supabase
         .from("columns")
         .update({'title' : editTitle})
         .match({'id': columnId})
         //console.log("voy a fetchtasks")
         const response2 = await this.fetchColumns();  
       },
       async updateColOrder(columnID, newOrder) {
        const {error} = await supabase
        .from("columns")
        .update({'order' : newOrder})
        .match({'id':columnID})

        const response2 = await this.fetchColumns()
       }
}


})