<template>
<div> {{task.title}} </div>
<div> Status: 
  <span v-if="task.status === 1"> Done</span>
  <span v-if="task.status === 0"> To Do</span></div>
<button type="submit" @click="deleteTask">Delete inside</button>
<br>
</template>

<script>

export default {
   
  props: ["task"],

}
</script>