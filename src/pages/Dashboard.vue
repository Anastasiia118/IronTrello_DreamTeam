<template>
  <div v-if="this.userStore.user">
    <h1>Dashboard</h1>
    <div>
      <h2>Columna de To do</h2>
      <TaskItem />
      <button type="submit" @click="takeTasks">Take Tasks</button>
    </div>
  </div>
  <div v-else>
  <router-view/>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import taskStore from "../stores/tasks.js";
import TaskItem from "../components/TaskItem.vue";
import userStore from "../stores/user.js";

export default {
  computed: {
    ...mapStores(taskStore),
    ...mapStores(userStore),
  },
  data() {
    return {
      tasks: null,
    };
  },
  methods: {
    async takeTasks() {
      console.log("entro en tasks");
      //const responses = await this.taskStore.fetchTasks();
      //console.log(response);
      tasks = await this.taskStore.tasks;
      console.log(tasks);
    },
  },
  components: {
    TaskItem,
  },
};
</script>
