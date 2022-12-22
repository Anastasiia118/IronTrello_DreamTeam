<template>
  <AppHeader />
  <div class="dashboard-wraper">
  <div class="content-wraper">
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
      <button id="btnCreateColumn"  type="submit" @click="addNewColumn(title); openAddColumn()">
         Add new column
      </button>
    </div>
    </div>
    <div class="columns-wraper items-start">
      <!-- <AppColumna :columnArr="tasksStore.todoArr" :columnStatus="0" />
      <AppColumna :columnArr="tasksStore.ongoingArr" :columnStatus="1" />
      <AppColumna :columnArr="tasksStore.doneArr" :columnStatus="2" /> -->
      <div v-for="(column, index) in columnsStore.columns" @drop="onDropCol($event, column)" @dragenter.prevent @dragover.prevent>
        <AppColumna1 :column="column" />
      </div>
    </div>
  </div>
    <AppFooter />
  </div>
  <router-view />
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
    async addNewColumn(title) {
      let orderNum = 0;
      let statusCount = 0;
      if(this.columnsStore.columns.length > 0){
        let biggestStatus = this.columnsStore.columns.reduce((a,b) => {
          if (a.status > b.status){
            return a
          }
          return b
        }).status;
        statusCount = biggestStatus + 1;
        console.log("biggest status:", biggestStatus)
      }
      if (this.columnsStore.columns.length > 0) {
        orderNum = this.columnsStore.columns[this.columnsStore.columns.length-1].order + 1;
      } 
      const response = await this.columnsStore.createColumn(
        this.userStore.user.id,
        title,
        statusCount,
        orderNum
      );
      //this.statusCount +=1;
      this.columnsStore.fetchColumns();
      //console.log("biggest status:", biggestStatus)
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
    async onDropCol(event, finalCol) {
      console.log("inicio ondropcol")
      const clone = {...finalCol};
      const initialColID = await event.dataTransfer.getData('initialColID');
      const initialCol = this.columnsStore.columns.find((column) => column.id == initialColID);
      const indexFinalCol = this.columnsStore.columns.indexOf(finalCol);
      const indexInitialCol =  this.columnsStore.columns.indexOf(initialCol);

      if (indexFinalCol < indexInitialCol) {
        this.columnsStore.columns
        .filter((column) => column.order >= finalCol.order && column.id != initialColID)
        .forEach(async (column) => {
          await this.columnsStore.updateColOrder(column.id,column.order+1)
          
        });
      } else {
        this.columnsStore.columns
        .filter((column) => column.order <= finalCol.order && column.id != initialColID)
        .forEach(async (column) => {
          await this.columnsStore.updateColOrder(column.id,column.order-1)
          
        });
      }
      await this.columnsStore.updateColOrder(initialColID, clone.order);
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
@media  (max-width: 480px){
  .dashboard-wraper{
  min-height: 100vh;
  padding: 20px;
 }
}
@media  (min-width: 481px){
 .dashboard-wraper{
  min-height: 87vh;
  padding: 50px;
 }
}
h1 {
  margin-bottom: 20px;
  font-size: 24px;
}
.dashboard-wraper {
  background-color: #292b31;
  color: #ffffff;
 
  width: 100vw;
  display: flex;
  flex-direction: column;
}
.content-wraper{
  flex: 1 0 auto;
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
