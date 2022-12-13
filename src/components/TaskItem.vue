<template>
Soy un TaskItem
<div> y dentro tengo: {{this.tasksStore.tasks[0].title}}  </div>
</template>

<script>
import { mapStores } from 'pinia';
import tasksStore from "../stores/tasks.js";
import userStore from "../stores/user.js";

export default {
    computed: {
    ...mapStores(tasksStore),
    ...mapStores(userStore),

    
  },
}
</script>