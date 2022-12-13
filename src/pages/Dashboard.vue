<template>
  <h1>Dashboard</h1>

  <router-link to="/Auth/signin"> Ir a Auth/signin </router-link> <br />
  <router-link to="/Auth/signup"> Ir a Auth/signup </router-link>

  <div>
    <h2>Columna de To do</h2>
    <TaskItem />
    <button type="submit" @click="takeTasks">Take Tasks</button>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import tasksStore from "../stores/tasks.js";
import TaskItem from "../components/TaskItem.vue";

export default {
  computed: {
    ...mapStores(tasksStore),
  },
  data() {
    return {
      tasks: null,
    };
  },
  methods: {
    async takeTasks() {
      console.log("entro en tasks")
      const response = await this.tasksStore.fetchTasks();
      console.log(response);
     /*  tasks = await this.tasksStore.tasks
      console.log(tasks) */
    },
  },
  components: {
    TaskItem,
  },
};
</script>
