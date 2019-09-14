<template>
  <div>
    <div class="row">
      <div class="col q-pa-sm">
        <q-input v-model="title" label="Add Routine" class="full-width" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <q-btn class="full-width q-ma-sm" @click="addRoutine" label="Create" color="purple" raised></q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import ControlPanelService from './../../services/ControlPanelService.js';

export default {
  data () {
    return {
      title: null
    }
  },
  methods: {
    addRoutine () {
      const daily = {
        title: this.title
      }
      ControlPanelService.addDaily(daily)
        .then(() => this.resetFields())
        .then(() => this.$emit('daily-updated'))
        .catch(err => console.log(err))
    },
    resetFields () {
      this.title = null
    }
  }
}
</script>

<style>
</style>
