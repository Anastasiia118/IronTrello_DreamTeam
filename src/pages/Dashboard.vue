<template>
  <div v-if="this.userStore.user">
    <h1>Dashboard</h1>
    <div>
      <h2>Columna de To do</h2>
      <div v-for="(task,index) in this.tasksStore.tasks">
       <TaskItem :task="task"/>
      </div> 
      <div>
        
      </div>
      
      <!-- <button type="submit" @click="takeTasks">Take Tasks</button> -->
      <button type="submit" @click="isActive">+ Add New Task</button>
      <br> <br>
      <textarea v-model="title" name="textarea" id="textarea" cols="30" rows="3" placeholder="Enter the text of your taks"></textarea>
      <br> <br>
      <button type="submit" @click="createTask(title)">Add</button>
    </div>
  </div>
  <div v-else>
  <router-view/>
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
  data() {
    return {
      tasks: [],
      title: "",
    };
  },
  methods: {
    async takeTasks() {
      console.log("entro en Taketasks")
      console.log(this.userStore.user.id)
      const response = await this.tasksStore.fetchTasks();
     
    },
   async createTask(title) {
      console.log("entro en dashboard createTask")
      const response2 = await this.tasksStore.createTask(this.userStore.user.id,title,"0")
    console.log("33bfbbf8-aa44-4c18-9fc3-3a2a8262b6c6")
    const response3 = await this.takeTasks()
    }
  },
  components: {
    TaskItem,
  },
  mounted() {
    console.log("before_mounted!");
    this.takeTasks();
  //hacer el loading

  } 
};
</script>
