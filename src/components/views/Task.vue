<template>
  <div class="q-pa-md q-mr-lg q-mt-lg">
    <q-card class="full-width full-height no-borders">
      <q-card-section>
        <div class="row">
          <div class="col">
            <edit-task v-on:task-updated="taskUpdated = true" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import editTask from "./../forms/editTask.vue";

export default {
  components: {
    "edit-task": editTask
  },
  data() {
    return {
      taskUpdated: false
    };
  },
  watch: {
    taskUpdated() {
      if (this.taskUpdated) {
        console.log("task updated");
        this.$emit("task-updated");
      }
    }
  }
};
</script>

<style>
</style>
