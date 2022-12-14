<template>
<div> {{task.title}} </div>
<div> {{task.id}}</div>
<div> Status: 
  <span v-if="task.status === 1"> Ongoing</span>
  <span v-if="task.status === 0"> To Do</span>
  <span v-if="task.status === 2"> Done</span></div>
<button type="submit" @click="deleteTask">Delete inside</button>
<button type="sumbit" @click="viewEdits">Edit T inside</button>
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
      console.log("entro en deleteTask inside")
      console.log(this.task.id)
      const response4 = await this.tasksStore.deleteTask(this.task.id);
      //const response3 = await this.takeTasks();
    },
    async editTask() {
      console.log("entro en edit dashboard y el title:");
      console.log(this.task.title);
      const rs = await this.tasksStore.updateTask(this.task.id, this.editTitle);
      //const res = await this.takeTasks();
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