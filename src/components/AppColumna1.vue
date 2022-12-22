<template>
  <div
    class="columna"
    @drop="onDrop($event, this.column.status)"
    @dragenter.prevent
    @dragover.prevent
  >
    <div class="titleColumn-box">
      <h2>status-{{ column.status }} / </h2> 
      <h2>{{ column.title }}</h2>
      <button id="btn-DelColumn" type="submit" @click="delColumn(); deleteColumnTasks()">
        Delete column
      </button>
    </div>
    <div
      v-for="(task, index) in filteredArrbyStatus"
      @drop="onDropList($event, task)"
    >
      <TaskItem :task="task" />
    </div>
    <button type="submit" @click="viewField()" class="addTask">
      <img src="../assets/images/AddTaskIcon.svg" alt="Add Icon" />
      Add New Task
    </button>
    <div v-if="toggleField" class="pull-down">
      <textarea
        v-model="title"
        name="textarea"
        id="textarea"
        cols="30"
        rows="3"
        placeholder="Enter the text of your taks"
      ></textarea>
      <div class="pulldownBtns justify-between flex flex-col">
        <button
          type="submit"
          @click="
            createTask(title, this.column.status);
            viewField();
            deleteText();
          "
        >
          Add
        </button>
        <button type="reset" @click="deleteText()">Reset</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import tasksStore from "../stores/tasks.js";
import TaskItem from "../components/TaskItem.vue";
import userStore from "../stores/user.js";
import columnsStore from "../stores/columns.js";

export default {
  computed: {
    ...mapStores(tasksStore),
    ...mapStores(userStore),
    ...mapStores(columnsStore),
    filteredArrbyStatus() {
      return this.tasksStore.tasks.filter(
        (task) => task.status === this.column.status
      );
    },
  },
  props: ["columnArr", "column"],
  data() {
    return {
      title: "",
      toggleField: false,
    };
  },
  methods: {
    async delColumn() {
      const resp = await this.columnsStore.deleteColumn(this.column.id);
      console.log("column id:", this.column.id);
        const response3 = await this.columnsStore.fetchColumns();
        console.log("columns:",this.columnsStore.columns)
    },
    async deleteColumnTasks() {
      const response4 = await this.tasksStore.deleteColTasks(this.column.status);
    },
    async createTask(title, status) {
      let orderNum = 1;
      if (this.filteredArrbyStatus.length > 0) {
        orderNum =
          this.filteredArrbyStatus[this.filteredArrbyStatus.length - 1].order +
          1;
      }
      const response2 = await this.tasksStore.createTask(
        this.userStore.user.id,
        title,
        status,
        orderNum
      );
      const response3 = await this.tasksStore.fetchTasks();
      //this.columnArr[0] = this.columnArr[1]
      console.log("array number:", this.filteredArrbyStatus);
    },
    viewField() {
      this.toggleField = !this.toggleField;
    },
    deleteText() {
      this.title = "";
    },
    async onDrop(event, status) {
      const taskID = event.dataTransfer.getData(`taskID`);
      const task = this.tasksStore.tasks.find((task) => task.id == taskID);
      //console.log("es task de ondrop", taskID);
      task.status = status;
      await this.tasksStore.updateStatus(taskID, task.status);
      //console.log("task de ondrop", task.status);
    },
    async onDropList(event, originTask) {
      const clone = { ...originTask };
      /* const taskOrder = event.dataTransfer.getData(`taskOrder`); */
      const taskID = await event.dataTransfer.getData(`taskID`);
      const task = await this.tasksStore.tasks.find((task) => task.id == taskID);
      const indexOriginTask = await this.filteredArrbyStatus.indexOf(originTask);
      const indexTookTask = await this.filteredArrbyStatus.indexOf(task);
      if (indexOriginTask < indexTookTask) {
        this.filteredArrbyStatus
          .filter((task) => task.order >= originTask.order && task.id != taskID)
          .forEach(async (task) => {
            await this.tasksStore.updateOrder(task.id, task.order + 1);
          });
      } else {
        this.filteredArrbyStatus
          .filter((task) => task.order <= originTask.order && task.id != taskID)
          .forEach(async (task) => {
            await this.tasksStore.updateOrder(task.id, task.order - 1);
          });
      }
      await this.tasksStore.updateOrder(taskID, clone.order);
     // const response2 = await this.tasksStore.fetchTasks(); 

      /* const indexOriginTask = this.columnArr.indexOf(originTask);
        const indexTookTask = this.columnArr.indexOf(task);
        const indexOfprev = this.columnArr.indexOf(originTask) - 2;
        const biggerOrder = originTask.order + 20;
        const newOrder = originTask.order - 20;
        const prevOrder = newOrder - 20;
        await this.tasksStore.updateOrder(taskID, originTask.order);
        if (originTask.order > taskOrder) {
          if (this.columnArr[indexOfprev]) {
            await this.tasksStore.updateOrder(
              this.columnArr[indexOfprev].id,
              prevOrder
            );
          }
          await this.tasksStore.updateOrder(originTask.id, newOrder);
        } else if (originTask.order < taskOrder) {
          const newOrder = originTask.order + 20;
          await this.tasksStore.updateOrder(originTask.id, newOrder);
        } else if ((originTask.order = taskOrder)) {
          if (indexTookTask > indexOriginTask) {
            await this.tasksStore.updateOrder(originTask.id, biggerOrder);
          }
        } */
    },
  },

  components: {
    TaskItem,
  },
  mounted() {
    console.log("columnArr", this.filteredArrbyStatus);
    //hacer el loading
  },
};
</script>

<style>
.columna {
  background-color: #24262c;
  border-radius: 12px;
  margin-right: 27px;
  padding: 16px;
  min-width: 352px;
  margin-bottom: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.columna h2 {
  color: #ea70ff;
  margin-bottom: 5px;
  margin-right: 5px;
  font-size: 18px;
}
.addTask {
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  color: #ffffff;
  background-color: #24262c;
  border: 0;
  margin-top: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 10px;
}
.addTask img {
  margin-right: 5px;
}
.pull-down {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
}
.pull-down textarea {
  outline: #292b31;
  border-radius: 12px;
  padding: 7px;
  font-family: "Exo 2";
  color: #24262c;
  margin-right: 5px;
  height: 66px;
}
.pull-down button {
  height: 30px;
  background-color: #4b69ff;
  border: none;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 100%;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  padding: 3px 7px;
  margin-bottom: 5px;
  border-radius: 8px;
}
.titleColumn-box {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
#btn-DelColumn {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  color: #4b69ff;
  padding: 8px 7px; 
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 7px;
  cursor: pointer;
  height: fit-content;
}
</style>
