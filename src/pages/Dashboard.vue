<template>
  <AppHeader />
  <div class="dashboard-wraper">
    <h1>Dashboard</h1>
    <div class="columns-wraper">
      <div class="columna">
        <h2>To do</h2>
        <div v-for="(task, index) in tasksStore.todoArr">
          <TaskItem :task="task" />
        </div>
        <button type="submit" @click="viewToDo()">+ Add New Task</button>
        <div v-if="toggleToDo">
          <textarea
            v-model="title"
            name="textarea"
            id="textarea"
            cols="30"
            rows="3"
            placeholder="Enter the text of your taks"
          ></textarea>
          <button type="submit" @click="createTask(title, 0);viewToDo();deleteText()">Add</button>
          <button type="reset" @click="deleteText()">reset</button>
        </div>
      </div>
      <div class="columna">
        <h2>Ongoing</h2>
        <div v-for="(task, index) in tasksStore.ongoingArr">
          <TaskItem :task="task" />
        </div>
        <button type="submit" @click="viewDoing">+ Add New Task</button>
        <div v-if="toggleDoing">
          <textarea
            v-model="title"
            name="textarea"
            id="textarea"
            cols="30"
            rows="3"
            placeholder="Enter the text of your taks"
          ></textarea>
          <button type="submit" @click="createTask(title, 1);viewDoing();deleteText()">Add</button>
          <button type="reset" @click="deleteText()">reset</button>
        </div>
      </div>
      <div class="columna">
        <h2>Done</h2>
        <div v-for="(task, index) in tasksStore.doneArr">
          <TaskItem :task="task" />
        </div>
        <button type="submit" @click="viewDone">+ Add New Task</button>
        <div v-if="toggleDone">
          <textarea
            v-model="title"
            name="textarea"
            id="textarea"
            cols="30"
            rows="3"
            placeholder="Enter the text of your taks"
          ></textarea>
          <button type="submit" @click="createTask(title, 2);viewDone();deleteText()">Add</button>
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
    deleteText(){
      this.title = '';
    }
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
  background-color: #292B31;
  color: #FFFFFF;
  padding: 30px;
  width: 100vw;
}
.columns-wraper {
  display: flex;
  justify-content: start;

}
.columna{
  background-color:#24262C;
}
</style>
