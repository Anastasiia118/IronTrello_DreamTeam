<template>
  <AppHeader />
  <div>
    <h1>Dashboard</h1>
    <div id="colums-wraper">
      <!-- <div class="columna">
        <h2>Columna de To do</h2>
        <div v-for="(task, index) in this.tasksStore.tasks">
          <TaskItem :task="task" />
          <br />
          <br />
        </div>

        <button type="submit" @click="viewNews">+ Add New Task</button>
        <br />
        <br />
        <div v-if="viewNew === true">
          <textarea
            v-model="title"
            name="textarea"
            id="textarea"
            cols="30"
            rows="3"
            placeholder="Enter the text of your taks"
          ></textarea>
          <br />
          <br />
          <button type="submit" @click="createTask(title)">Add</button>
        </div>
      </div> -->
      <div class="columna">
        <h2>To do</h2>
        <div v-for="(task, index) in todoArr">
          <TaskItem :task="task" />
          <br />
          <br />
        </div>

        <button type="submit" @click="viewNews">+ Add New Task</button>
        <br />
        <br />
        <div v-if="viewNew === true">
          <textarea
            v-model="title"
            name="textarea"
            id="textarea"
            cols="30"
            rows="3"
            placeholder="Enter the text of your taks"
          ></textarea>
          <br />
          <br />
          <button type="submit" @click="createTask(title)">Add</button>
        </div>
      </div>
      <div class="columna">
        <h2>Ongoing</h2>
        <div v-for="(task, index) in ongoingArr">
          <TaskItem :task="task" />
          <br />
          <br />
        </div>

        <button type="submit" @click="viewNews">+ Add New Task</button>
        <br />
        <br />
        <div v-if="viewNew === true">
          <textarea
            v-model="title"
            name="textarea"
            id="textarea"
            cols="30"
            rows="3"
            placeholder="Enter the text of your taks"
          ></textarea>
          <br />
          <br />
          <button type="submit" @click="createTask(title)">Add</button>
        </div>
      </div>
      <div class="columna">
        <h2>Done</h2>
        <div v-for="(task, index) in doneArr">
          <TaskItem :task="task" />
          <br />
          <br />
        </div>

        <button type="submit" @click="viewNews">+ Add New Task</button>
        <br />
        <br />
        <div v-if="viewNew === true">
          <textarea
            v-model="title"
            name="textarea"
            id="textarea"
            cols="30"
            rows="3"
            placeholder="Enter the text of your taks"
          ></textarea>
          <br />
          <br />
          <button type="submit" @click="createTask(title)">Add</button>
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
import tasks from "../stores/tasks.js";
import AppHeader from "../components/AppHeader.vue";

export default {
  computed: {
    ...mapStores(tasksStore),
    ...mapStores(userStore),
    todoArr() {
      console.log(this.tasks);
      const rep = this.tasks.filter((task) => task.status === 0);
      return rep;
    },
    ongoingArr() {
      console.log(this.tasks);
      const rep = this.tasks.filter((task) => task.status === 1);
      return rep;
    },
    doneArr() {
      console.log(this.tasks);
      const rep = this.tasks.filter((task) => task.status === 2);
      return rep;
    },
  },
  data() {
    return {
      tasks: [],
      title: "",
      viewNew: false,
    };
  },
  methods: {
    async takeTasks() {
      const response = await this.tasksStore.fetchTasks();
      this.tasks = this.tasksStore.tasks;
    },

    /* this.ongoingArr = tasks.filter(task => task.status === "1");
      console.log(this.ongoingArr);
      this.doneArr = tasks.filter(task => task.status === "2") 
    },*/
    async createTask(title) {
      const response2 = await this.tasksStore.createTask(
        this.userStore.user.id,
        title,
        0
      );
      const response3 = await this.takeTasks();
    },
    viewNews() {
      if (this.viewNew === false) {
        this.viewNew = true;
      } else if (this.viewNew === true) {
        this.viewNew = false;
      }
    },
  },
  components: {
    TaskItem,
    AppHeader,
  },
  mounted() {
    console.log("mounted!");
    this.takeTasks();
    //console.log("voy a filterTasks");
    //this.filterTasks();
    //hacer el loading
  },
};
</script>

<style scoped>
#colums-wraper {
  background-color: lightblue;
  display: flex;
  flex-direction: row;
}
</style>
