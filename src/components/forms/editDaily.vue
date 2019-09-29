<template>
  <div>
    <q-list v-if="routine">
      <q-item class="row justify-between">
        <q-btn color="purple" raised label="Delete" @click="deleteRoutine" />
        <q-btn color="purple" raised label="Update" @click="updateRoutine" />
      </q-item>
      <q-item>
        <div class="row full-width">
          <!-- <div class="col">
            <label class="q-pl-lg full-width toggle-label">set reminder</label>
            <br />
            <q-btn-toggle
              v-model="daily.reminder"
              class="q-pl-md toggle"
              no-caps
              rounded
              unelevated
              toggle-color="purple"
              color="white"
              text-color="primary"
              :options="[
          {label: 'Yes', value: 'yes'},
          {label: 'No', value: 'no'}
        ]"
            />
          </div>-->
          <div class="col text-center">
            <label class="q-pl-lg full-width toggle-label text-grey">completed</label>
            <br />
            <q-btn-toggle
              v-model="routine.completed"
              class="q-pl-md toggle"
              no-caps
              rounded
              unelevated
              toggle-color="purple"
              color="white"
              text-color="primary"
              :options="[
          {label: 'Yes', value: 'yes'},
          {label: 'No', value: 'no'}
        ]"
            />
          </div>
          <div class="col text-center">
            <label class="q-pl-lg full-width toggle-label text-grey">reset</label>
            <br />
            <q-btn-toggle
              v-model="routine.reset"
              class="q-pl-md toggle"
              no-caps
              rounded
              unelevated
              toggle-color="purple"
              color="white"
              text-color="primary"
              :options="[
          {label: 'Yes', value: 'yes'},
          {label: 'No', value: 'no'}
        ]"
            />
          </div>
        </div>
      </q-item>
      <q-item>
        <q-input outlined v-model="routine.title" label="Name" class="full-width" />
      </q-item>
      <q-item>
        <q-input outlined v-model="routine.frequency" label="Frequency" class="full-width" />
      </q-item>
      <q-item>
        <q-date
          @click="showDate = !showDate"
          v-if="showDate == true"
          v-model="routine.completed_date"
          mask="MM/DD/YYYY"
          minimal
        />
        <q-input
          v-if="showDate == false"
          @click="showDate = !showDate"
          outlined
          v-model="routine.completed_date"
          label="Last Completed Date"
          class="full-width"
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
    routines () {
      return this.$store.state.routines
    },
    routine () {
      let id = this.path.split('/')[3]
      return this.routines.filter(i => i._id === id)[0]
    }
  },
  methods: {
    updateRoutine () {
      ControlPanelService.updateDaily(this.routine._id, this.routine)
        .then(() => {
          this.$emit('daily-updated')
        })
        .catch(e => console.log('error : ' + e))
    },
    deleteRoutine () {
      ControlPanelService.deleteDaily(this.routine._id)
        .then(() => {
          this.$emit('daily-updated')
          this.$router.replace('/routines')
        })
        .catch(e => console.log('error : ' + e))
    }
  },
  mounted () {
    this.$store.dispatch('getRoutines')
  }
}
</script>
