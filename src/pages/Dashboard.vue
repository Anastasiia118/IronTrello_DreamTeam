<template>
  <div v-if="this.userStore.user">
    <h1>Dashboard</h1>
    <div>
      <h2>Columna de To do</h2>
      <div>
        <TaskItem :task="this.tasksStore.tasks[0]"/>
      </div>
       <div v-for="(task,index) in this.tasksStore.tasks">
       <TaskItem :task="task"/>
      </div> 
      <div>
        
      </div>
      
      <button type="submit" @click="takeTasks">Take Tasks</button>
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
      tasks: null,
    };
  },
  methods: {
    async takeTasks() {
      console.log("entro en Taketasks")
      console.log(this.userStore.user.id)
      const response = await this.tasksStore.fetchTasks(this.userStore.user.id);
     
    },
  },
  components: {
    TaskItem,
  },
  beforeMount() {
    console.log("before_mounted!");
    this.takeTasks();
   // this.userStore.fetchUser();
  }
};
</script>
