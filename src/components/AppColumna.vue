<template>
  <div
    class="columna"
    @drop="onDrop($event, columnStatus)"
    @dragenter.prevent
    @dragover.prevent
  >
    <h2 v-if="columnStatus === 1">Ongoing</h2>
    <h2 v-if="columnStatus === 0">To Do</h2>
    <h2 v-if="columnStatus === 2">Done</h2>
    <div v-for="(task, index) in columnArr" @drop="onDropList($event, task)">
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
            createTask(title, columnStatus);
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

export default {
  computed: {
    ...mapStores(tasksStore),
    ...mapStores(userStore),
  },
  props: ["columnArr", "columnStatus"],
  data() {
    return {
      title: "",
      toggleField: false,
    };
  },
  methods: {
    async createTask(title, status) {
      let orderNum = 1;
      if (this.columnArr.length > 0) {
        orderNum = this.columnArr[this.columnArr.length - 1].order + 1;
      }
      const response2 = await this.tasksStore.createTask(
        this.userStore.user.id,
        title,
        status,
        orderNum
      );
      const response3 = await this.tasksStore.fetchTasks();
      //this.columnArr[0] = this.columnArr[1]
      console.log("array number:", this.columnArr);
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
      console.log("es task", taskID);
      task.status = status;
      await this.tasksStore.updateStatus(taskID, task.status);
      console.log("task", task);
    },
    async onDropList(event, originTask) {
      const clone = { ...originTask };
      /* const taskOrder = event.dataTransfer.getData(`taskOrder`); */
      const taskID = event.dataTransfer.getData(`taskID`);
      const task = this.tasksStore.tasks.find((task) => task.id == taskID);
      const indexOriginTask = this.columnArr.indexOf(originTask);
      const indexTookTask = this.columnArr.indexOf(task);
      if (indexOriginTask < indexTookTask) {
        this.columnArr
          .filter((task) => task.order >= originTask.order)
          .forEach((task) => {
            this.tasksStore.updateOrder(task.id, task.order + 1);
          });
      } else {
        this.columnArr
        .filter((task) => task.order <= originTask.order)
        .forEach((task) => {
            this.tasksStore.updateOrder(task.id, task.order - 1);
        })
      }
      await this.tasksStore.updateOrder(taskID, clone.order);
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
    console.log("columnArr", this.columnArr);
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
  margin-bottom: 15px;
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
</style>
