<template>
  <AppHeader />
  <div class="dashboard-wraper">
    <h1>Dashboard</h1>

    <div class="columns-wraper items-start">
      <AppColumna :columnArr="tasksStore.todoArr" :columnStatus="0" />
      <AppColumna :columnArr="tasksStore.ongoingArr" :columnStatus="1" />
      <AppColumna :columnArr="tasksStore.doneArr" :columnStatus="2" />
      <div v-for="(column, index) in columnsStore.columns">
        
        <AppColumna1 :column="column" />
      </div>
    </div>
    <AppFooter />
  </div>
  <router-view />
  <!--  esto del router view se puede quitar? -->
</template>

<script>
import { mapStores } from "pinia";
import tasksStore from "../stores/tasks.js";
import userStore from "../stores/user.js";
import columnsStore from "../stores/columns.js";
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";
import AppColumna from "../components/AppColumna.vue";
import AppColumna1 from "../components/AppColumna1.vue";

export default {
  computed: {
    ...mapStores(tasksStore),
    ...mapStores(userStore),
    ...mapStores(columnsStore),
  },
  methods: {
    async takeTasks() {
      const response = await this.tasksStore.fetchTasks();
      this.tasks = this.tasksStore.tasks;
    },
  },
  components: {
    AppHeader,
    AppFooter,
    AppColumna,
    AppColumna1,
  },
  mounted() {
    this.tasksStore.fetchTasks();
    this.columnsStore.fetchColumns();
    console.log("columns 0", this.columnsStore.columns);
  },
};
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
  font-size: 24px;
}
.dashboard-wraper {
  background-color: #292b31;
  color: #ffffff;
  padding: 50px;
  width: 100vw;
  min-height: 100vh;
}
.columns-wraper {
  display: flex;
  flex-wrap: wrap;
}
.columns-wraper:last-child {
  margin-right: 0;
}
</style>
