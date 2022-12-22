<template>
  <AppHeader />
  <div class="dashboard-wraper">
  <div class="dashboard-title-box flex">
    <h1>Dashboard</h1>
    <button id="deleteAll-btn" type="submit" @click="deleteAll()">Delete All</button>
  </div>
    <div class="newColumnBox">
      <button class="newColumn-btn" type="button" @click="openAddColumn(); deleteTextColumn()">New Column</button>
    <div class="createCol items-start" v-if="viewAddColumn" >
      <textarea 
        v-model="title"
        name="textarea"
        id="textarea"
        cols="30"
        rows="3"
        placeholder="Enter the title of your column"
      ></textarea>
      <button id="btnCreateColumn"  type="submit" @click="addNewColumn(title, statusCount); openAddColumn()">
         Add new column
      </button>
    </div>
    </div>
    <div class="columns-wraper items-start">
      <!-- <AppColumna :columnArr="tasksStore.todoArr" :columnStatus="0" />
      <AppColumna :columnArr="tasksStore.ongoingArr" :columnStatus="1" />
      <AppColumna :columnArr="tasksStore.doneArr" :columnStatus="2" /> -->
      <div v-for="(column, index) in columnsStore.columns">
        <AppColumna1 :column="column" />
      </div>
    </div>
  </div>
  <AppFooter />
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
      textColumn: "",
      statusCount: 0
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
      let orderNum = 1;
      if (this.columnsStore.columns.length > 0) {
        orderNum = this.columnsStore.columns[this.columnsStore.columns.length-1].order + 1;
      }
      
      const response = await this.columnsStore.createColumn(
        this.userStore.user.id,
        title,
        status,
        orderNum
      );
      this.statusCount +=1;
      this.columnsStore.fetchColumns();
    },
    openAddColumn(){
      this.viewAddColumn = !this.viewAddColumn;
    },
    deleteTextColumn() {
      this.title = "";
    },
    async deleteAll(){
      const response = await this.tasksStore.deleteAllTasks(this.userStore.user.id)
      const new_responce = await this.columnsStore.deleteAllColumns(this.userStore.user.id)
      console.log("this.columnsStore.user_id:", this.userStore.user.id)
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
  min-height: calc(90vh - 80px);;
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
}
.createCol textarea {
  outline: #292b31;
  border-radius: 12px;
  padding: 7px;
  font-family: "Exo 2";
  color: #24262c;
  margin-right: 5px;
  margin-bottom: 3px;
  height: 66px;
}
.newColumnBox{
  margin-bottom: 15px;
  
}
.newColumn-btn{
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  color: #fff;
  padding: 8px 7px; 
  background-color: #4B69FF;
  border-radius: 7px;
  cursor: pointer;
  height: fit-content;
  margin-bottom: 10px;
}
#btnCreateColumn {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  color: #fff;
  padding: 8px 7px; 
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 7px;
  cursor: pointer;
  height: fit-content;
  margin-top: 10px;
}
.dashboard-title-box{
  justify-content: space-between;
}
#deleteAll-btn{
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  color: #fff;
  padding: 8px 7px; 
  background-color: #ea70ff;
  border-radius: 7px;
  cursor: pointer;
  height: fit-content;
  margin-bottom: 10px;
}
</style>
