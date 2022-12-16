<template>
  <div class="columna">
  <h2 v-if="columnStatus === 1"> Ongoing</h2>
  <h2 v-if="columnStatus === 0"> To Do</h2>
  <h2 v-if="columnStatus === 2"> Done</h2>
    <div v-for="(task, index) in columnArr">
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
          @click="createTask(title, columnStatus);
            viewField();
            deleteText();">
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
    async takeTasks() {
      const response = await this.tasksStore.fetchTasks();
      this.tasks = this.tasksStore.tasks;
    }, 
    async createTask(title, status) {
      const response2 = await this.tasksStore.createTask(
        this.userStore.user.id,
        title,
        status 
      );
      const response3 = await this.tasksStore.fetchTasks();
    },
    viewField() {
      this.toggleField = !this.toggleField;
    },
    deleteText() {
        this.title = "";
    },
  },
  components: {
    TaskItem,
  },
  mounted() {
    this.tasksStore.fetchTasks();
    //hacer el loading
    console.log("columnArr", this.columnArr);
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
  border: 1px solid rgba(255, 255, 255, 0.1);;

}
.columna h2 {
  color:#ea70ff;
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
