<template>
  <div>
    <h1>Dashboard</h1>
    <div>
      <h2>Columna de To do</h2>
      <div v-for="(task, index) in this.tasksStore.tasks">
        <TaskItem :task="task" />
        <button type="submit" @click="deleteTask(task.id)">Delete</button>
        <button type="submit" @click="viewEdits">
          Edit task
        </button>
        <br />
        <div v-if="viewEdit === true">
        <textarea
          v-model="editTitle"
          name="edittext"
          id="edittext"
          cols="30"
          rows="3"
        ></textarea>
        <button type="submit"  @click="editTask(task.id, editTitle)">Edit</button>
        </div>
        <br />

        <br />
      </div>
      <div></div>

      <!-- <button type="submit" @click="takeTasks">Take Tasks</button> -->
      <button type="submit" @click="viewNews">+ Add New Task</button>
      <br />
      <br />
      <div v-if="viewNew === true">
        <textarea
          v-model="title"
          name="textarea"
          id="textarea"
          cols="30"
          rows="3"
          placeholder="Enter the text of your taks"
        ></textarea>
        <br />
        <br />
        <button type="submit" @click="createTask(title)">Add</button>
      </div>
    </div>
  </div>
  <!-- <div v-else> -->
  <router-view/>
</template>

<script>
import { mapStores } from "pinia";
import tasksStore from "../stores/tasks.js";
import TaskItem from "../components/TaskItem.vue";
import userStore from "../stores/user.js";

export default {
  computed: {
    ...mapStores(tasksStore),
    ...mapStores(userStore),
  },
  data() {
    return {
      tasks: [],
      title: "",
      viewNew: false,
      editTitle: "",
      viewEdit: false,
    };
  },
  methods: {
    async takeTasks() {
      const response = await this.tasksStore.fetchTasks();
    },
    async createTask(title) {
      const response2 = await this.tasksStore.createTask(
        this.userStore.user.id,
        title,
        "0"
      );
      const response3 = await this.takeTasks();
    },
    viewNews() {
      if (this.viewNew === false) {
        this.viewNew = true;
      } else if (this.viewNew === true) {
        this.viewNew = false;
      }
    },
    viewEdits() {
      if (this.viewEdit === false) {
        this.viewEdit = true;
      } else if (this.viewEdit === true) {
        this.viewEdit = false;
      }
    },
    async deleteTask(taskId) {
      const response4 = await this.tasksStore.deleteTask(taskId);
      const response3 = await this.takeTasks();
    },
    async editTask(taskId, editTitle) {
      console.log("entro en edit dashboard y el title:");
      console.log(editTitle);
      const rs = await this.tasksStore.updateTask(taskId, editTitle);
      console.log("voy a take tasks otra vez");
      const res = await this.takeTasks();
    },
  },
  components: {
    TaskItem,
  },
  mounted() {
    console.log("mounted!");
    this.takeTasks();
    //hacer el loading
  },
};

</script>
