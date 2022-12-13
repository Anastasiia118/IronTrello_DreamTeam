<template>
  <div v-if="this.userStore.user">
    <h1>Dashboard</h1>
    <div>
      <h2>Columna de To do</h2>
      <div v-for="(task, index) in this.tasksStore.tasks">
        <TaskItem :task="task" />
        <button type="submit" @click="deleteTask(task.id)">Delete</button>
        <button type="submit" @click="editTask(task.id)">Edit</button>
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
  <div v-else>
    <router-view />
  </div>
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
    async deleteTask(taskId) {
      const response4 = await this.tasksStore.deleteTask(taskId);
      const response3 = await this.takeTasks();
    },
    async editTask(taskId) {
      console.log("entro en edit dashboard")
      const rs = await this.tasksStore.updateTask(taskId)
      console.log("voy a take tasks otra vez")
      const res= await this.takeTasks()
    }
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
