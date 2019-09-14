<template>
  <div>
    <q-list v-if="task">
      <q-item class="row justify-between">
        <q-btn @click="deleteTask" color="purple" raised label="Delete" />
        <q-btn @click="updateTask" color="purple" raised label="Update" />
      </q-item>
      <q-item>
        <div class="row full-width">
          <div class="col">
            <q-input
              type="number"
              label="Priority"
              outlined
              v-model="task.priority"
              class="full-width q-pa-sm"
            />
          </div>
          <div class="col">
            <label class="q-pl-lg full-width toggle-label">set reminder</label>
            <br />
            <q-btn-toggle
              v-model="task.reminder"
              class="q-pl-md toggle"
              no-caps
              rounded
              unelevated
              raised
              toggle-color="purple"
              color="white"
              text-color="primary"
              :options="[
          {label: 'Yes', value: 1},
          {label: 'No', value: 0}
        ]"
            />
          </div>
        </div>
      </q-item>
      <q-item class="row wrap justify-between items-start">
        <q-input outlined v-model="task.title" label="Title" class="full-width q-pa-sm" />
        <div>
          <q-input
            v-if="showDate == false"
            @click="showDate = !showDate"
            outlined
            v-model="task.duedate"
            label="Due Date"
            class="q-pa-sm"
          />
          <q-date
            @click="showDate = !showDate"
            v-if="showDate == true"
            v-model="task.duedate"
            mask="MM/DD/YYYY"
            minimal
          />
        </div>
      </q-item>
      <q-item>
        <q-input
          type="textarea"
          outlined
          v-model="task.description"
          label="Description"
          class="full-width q-pa-sm"
          rows="4"
        />
      </q-item>
    </q-list>
  </div>
</template>

<script>
import ControlPanelService from './../../services/ControlPanelService.js';

export default {
  data () {
    return {
      showDate: false
    }
  },
  computed: {
    path () {
      return this.$route.path
    },
    tasks () {
      return this.$store.state.tasks
    },
    task () {
      let id = this.path.split('/')[3]
      return this.tasks.filter(i => i._id === id)[0]
    }
  },
  methods: {
    deleteTask () {
      ControlPanelService.deleteTask(this.task._id)
        .then(() => {
          this.$emit('daily-updated')
          this.$router.replace('/stuffz')
        })
        .catch(e => console.log('error : ' + e))
    },
    updateTask () {
      ControlPanelService.updateTask(this.task._id, this.task)
        .then(() => this.$emit('task-updated'))
        .catch(error => console.log(error))
    }
  },
  mounted () {
    this.$store.dispatch('getTasks')
  }
}
</script>

<style>
</style>
