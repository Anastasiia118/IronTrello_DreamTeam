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
        <div v-for="(task, index) in tasksStore.todoArr">
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
        <div v-for="(task, index) in tasksStore.ongoingArr">
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
        <div v-for="(task, index) in tasksStore.doneArr">
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
      viewNew: false,
      
    };
  },
  methods: {
   
   /*  async takeTasks() {
      const response = await this.tasksStore.fetchTasks();
      this.tasks = this.tasksStore.tasks;
    }, */
    async createTask(title) {
      const response2 = await this.tasksStore.createTask(
        this.userStore.user.id,
        title,
        0
      );
      const response3 = await this.tasksStore.fetchTasks();
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
    this.tasksStore.fetchTasks();
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
