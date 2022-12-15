<template>
<b>{{task.title}}</b>
<div> Status: 
  <span v-if="task.status === 1"> Ongoing</span>
  <span v-if="task.status === 0"> To Do</span>
  <span v-if="task.status === 2"> Done</span></div>
<button type="submit" @click="deleteTask">Delete</button>
<button type="sumbit" @click="viewEdits">Edit Task</button>
<div v-if="viewEdit === true">
        <textarea
          v-model="editTitle"
          name="edittext"
          id="edittext"
          cols="30"
          rows="3"
        ></textarea>
        <button type="submit"  @click="editTask">Edit</button>
        </div>
<br>
</template>

<script>
import { mapStores } from "pinia";
import tasksStore from "../stores/tasks.js";
import userStore from "../stores/user.js";

export default {
  computed: {
    ...mapStores(tasksStore),
    ...mapStores(userStore),
  },
  props: ["task"],
  data() {
    return {
      viewEdit: false, 
      editTitle: "",
    };
  },
  methods: {
    async deleteTask() {
      //console.log("entro en deleteTask inside")
      const response4 = await this.tasksStore.deleteTask(this.task.id);
    },
    async editTask() {
     // console.log("entro en edit del taskitem y el title:");
      const rs = await this.tasksStore.updateTask(this.task.id, this.editTitle);
    },
    viewEdits() {
       if (this.viewEdit === false) {
        this.viewEdit = true;
      } else if (this.viewEdit === true) {
        this.viewEdit = false;
      } 
      
    },
  },
}
</script>