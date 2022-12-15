<template>
  <!-- <AppHeader /> -->
  <div class="dashboard-wraper">
    <h1>Dashboard</h1>
    <div class="columns-wraper">
      <div class="columna">
        <h2>To do</h2>
        <div v-for="(task, index) in tasksStore.todoArr">
          <TaskItem :task="task" />
        </div>
        <button type="submit" @click="viewToDo()" class="addTask">
          <img src="../assets/images/AddTaskIcon.svg" alt="Add Icon" />
          Add New Task
        </button>
        <div v-if="toggleToDo" class="pull-down">
          <textarea
            v-model="title"
            name="textarea"
            id="textarea"
            cols="30"
            rows="3"
            placeholder="Enter the text of your taks"
          ></textarea>
          <button
            type="submit"
            @click="
              createTask(title, 0);
              viewToDo();
              deleteText();
            "
          >
            Add
          </button>
          <button type="reset" @click="deleteText()">Reset</button>
        </div>
      </div>
      <div class="columna">
        <h2>Ongoing</h2>
        <div v-for="(task, index) in tasksStore.ongoingArr">
          <TaskItem :task="task" />
        </div>
        <button type="submit" @click="viewDoing" class="addTask">
          <img src="../assets/images/AddTaskIcon.svg" alt="Add Icon" />
          Add New Task
        </button>
        <div v-if="toggleDoing" class="pull-down">
          <textarea
            v-model="title"
            name="textarea"
            id="textarea"
            cols="30"
            rows="3"
            placeholder="Enter the text of your taks"
          ></textarea>
          <button
            type="submit"
            @click="
              createTask(title, 1);
              viewDoing();
              deleteText();
            "
          >
            Add
          </button>
          <button type="reset" @click="deleteText()">reset</button>
        </div>
      </div>
      <div class="columna">
        <h2>Done</h2>
        <div v-for="(task, index) in tasksStore.doneArr">
          <TaskItem :task="task" />
        </div>
        <button type="submit" @click="viewDone" class="addTask">
          <img src="../assets/images/AddTaskIcon.svg" alt="Add Icon" />
          Add New Task
        </button>
        <div v-if="toggleDone" class="pull-down">
          <textarea
            v-model="title"
            name="textarea"
            id="textarea"
            cols="30"
            rows="3"
            placeholder="Enter the text of your taks"
          ></textarea>
          <button
            type="submit"
            @click="
              createTask(title, 2);
              viewDone();
              deleteText();
            "
          >
            Add
          </button>
          <button type="reset" @click="deleteText()">reset</button>
        </div>
      </div>
    </div>
  </div>
  <router-view />
</template>

<script>
import { mapStores } from "pinia";
import tasksStore from "../stores/tasks.js";
import TaskItem from "../components/TaskItem.vue";
import userStore from "../stores/user.js";
//import tasks from "../stores/tasks.js";
import AppHeader from "../components/AppHeader.vue";

export default {
  computed: {
    ...mapStores(tasksStore),
    ...mapStores(userStore),
  },
  data() {
    return {
      title: "",
      /* viewNew: false, */
      toggleToDo: false,
      toggleDoing: false,
      toggleDone: false,
    };
  },
  methods: {
    /*  async takeTasks() {
      const response = await this.tasksStore.fetchTasks();
      this.tasks = this.tasksStore.tasks;
    }, */
    async createTask(title, status) {
      const response2 = await this.tasksStore.createTask(
        this.userStore.user.id,
        title,
        status
      );
      const response3 = await this.tasksStore.fetchTasks();
    },
    viewToDo() {
      this.toggleToDo = !this.toggleToDo;
    },
    viewDoing() {
      this.toggleDoing = !this.toggleDoing;
    },
    viewDone() {
      this.toggleDone = !this.toggleDone;
    },
    deleteText() {
      this.title = "";
    },
  },
  components: {
    TaskItem,
    AppHeader,
  },
  mounted() {
    this.tasksStore.fetchTasks();
    //hacer el loading
  },
};
</script>

<style scoped>
.dashboard-wraper {
  background-color: #292b31;
  color: #ffffff;
  padding: 30px;
  width: 100vw;
  min-height: 100vh;
}
.columns-wraper {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
}
.columns-wraper:last-child {
  margin-right: 0;
}
.columna {
  background-color: #24262c;
  border-radius: 12px;
  margin-right: 27px;
  padding: 16px;
  min-width: 352px;;
  margin-bottom: 20px;
}
.columna h2 {
  color: rgba(255, 255, 255, 0.5);
}
.addTask {
  font-style: normal;
  font-weight: 600;
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
  align-items: center;
}
.pull-down textarea {
  outline: #292b31;
  border-radius: 12px;
  padding: 10px;
  font-family: 'Exo 2';
  color:#24262c;
}
.pull-down button {
  height: 30px;
  color:#ffffff;
  background-color:#24262c;
  border: none;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 100%;
  color: #ffffff;
  cursor: pointer;

}
</style>
