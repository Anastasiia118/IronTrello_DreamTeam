<template>
  <AppHeader />
  <div class="dashboard-wraper">
    <h1>Dashboard</h1>
    <button type="button" @click="openAddColumn()">New Column</button>
    <div class="createCol" v-if="viewAddColumn">
      <textarea 
        v-model="title"
        name="textarea"
        id="textarea"
        cols="30"
        rows="3"
        placeholder="Enter the title of your column"
      ></textarea>
      <button class="btnCreateColumn"  type="submit" @click="addNewColumn(title, columnsStore.columns.length)">
        Create new column
      </button>
    </div>

    <div class="columns-wraper items-start">
      <!-- <AppColumna :columnArr="tasksStore.todoArr" :columnStatus="0" />
      <AppColumna :columnArr="tasksStore.ongoingArr" :columnStatus="1" />
      <AppColumna :columnArr="tasksStore.doneArr" :columnStatus="2" /> -->
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
  data() {
    return {
      viewAddColumn: false,
    };
  },
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
    async addNewColumn(title, status) {
      console.log("entro en create col dash")
      ++this.count
      
      console.log(this.count)
      const response = await this.columnsStore.createColumn(
        this.userStore.user.id,
        title,
        status
      );
      this.columnsStore.fetchColumns();
    },
    openAddColumn(){
      this.viewAddColumn = !this.viewAddColumn;
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
.createCol{
  display: flex;
  flex-direction: column;
  align-items: start;
}
.createCol textarea {
  outline: #292b31;
  border-radius: 12px;
  padding: 7px;
  font-family: "Exo 2";
  color: #24262c;
  margin-right: 5px;
  height: 66px;
}
</style>
