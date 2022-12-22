<template>
  <div
    class="task-wrapper"
    draggable="true"
    @dragstart="startDrag($event, task)"
  >
    <p class="task-desc">{{ task.title }}</p>
    <!-- <div class="statusTask"> Status: 
  <span v-if="task.status === 1"> Ongoing</span>
  <span v-if="task.status === 0"> To Do</span>
  <span v-if="task.status === 2"> Done</span></div> -->
    <button id="delete-btn" type="submit" @click="deleteTask">Delete</button>
    <button id="edit-btn" type="sumbit" @click="viewEdits()">Edit Task</button>
    <div class="edit-box items-start" v-if="viewEdit === true">
      <textarea
        v-model="editTitle"
        name="edittext"
        id="edittext"
        cols="30"
        rows="3"
      ></textarea>
      <button
        type="submit"
        @click="
          editTask();
          viewEdits();
        "
      >
        Ok
      </button>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import tasksStore from "../stores/tasks.js";
import userStore from "../stores/user.js";

export default {
  computed: {
    ...mapStores(tasksStore),
    ...mapStores(userStore),
  },
  props: ["task"],
  data() {
    return {
      viewEdit: false,
      editTitle: "",
    };
  },
  methods: {
    async deleteTask() {
      //console.log("entro en deleteTask inside")
      const response4 = await this.tasksStore.deleteTask(this.task.id);
    },
    async editTask() {
      // console.log("entro en edit del taskitem y el title:");
      const rs = await this.tasksStore.updateTask(this.task.id, this.editTitle);
    },
    viewEdits() {
      this.viewEdit = !this.viewEdit;
    },
    startDrag(event, task) {
      console.log(task);
      event.dataTransfer.dropEffect = `move`;
      event.dataTransfer.effectAllowed = `move`;
      event.dataTransfer.setData(`taskID`, this.task.id);
      event.dataTransfer.setData(`taskOrder`, this.task.order);
    },
  },
};
</script>
<style>
.task-wrapper {
  max-width: 320px;
  background-color: rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 14px;
}
.task-wrapper:hover{
  border: 1px dashed #ea70ff;
  
}
.statusTask {
  font-family: "Exo 2";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 100%;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 10px;
}
.task-desc {
  margin-bottom: 15px;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
}
#delete-btn {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  margin-right: 7px;
  background-color: #989caa;
  padding: 5px 7px;
  border-radius: 7px;
}
#delete-btn:hover {
  background-color: #4b69ff;
}
#edit-btn {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  color: #4b69ff;
}
#edit-btn:hover {
  color: white;
}
.edit-box {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
}
.edit-box textarea {
  outline: #292b31;
  border-radius: 12px;
  padding: 7px;
  font-family: "Exo 2";
  color: #24262c;
  margin-right: 5px;
  height: 66px;
}
</style>
