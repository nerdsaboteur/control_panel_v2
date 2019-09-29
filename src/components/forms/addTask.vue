<template>
  <div>
    <div class="row q-mt-md bg-white">
      <div class="col q-py-sm q-pl-md">
        <q-input v-model="title" label="Add Task" class="full-width" />
      </div>
    </div>
    <div class="row q-mb-md">
      <div class="col">
        <q-btn class="full-width q-ma-sm" @click="addTask" label="Create" color="purple" raised></q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import ControlPanelService from "./../../services/ControlPanelService.js";

export default {
  data() {
    return {
      title: null
    };
  },
  methods: {
    addTask() {
      const task = {
        title: this.title
      };
      ControlPanelService.addTask(task)
        .then(() => {
          this.resetFields();
          this.$emit("task-updated");
        })
        .catch(err => console.log(err));
    },
    resetFields() {
      this.title = null;
    }
  }
};
</script>

<style>
</style>
