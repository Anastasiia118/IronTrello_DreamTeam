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

    async createColumn(userId,title) {
        const response = await supabase
        .from("columns")
        .insert({
          'user_id': userId,
          'title': title,

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
      async updateColTitle(columnId, editTitle) {
        // console.log("entro en updateTask column js")
         const {error} = await supabase
         .from("columns")
         .update({'title' : editTitle})
         .match({'id': columnId})
         //console.log("voy a fetchtasks")
         const response2 = await this.fetchColumns();  
       },
}


})