<template>
  <div class="full-width full-height">
    <div class="row wrap bg-primary">
      <div class="col-md-4 q-pl-md">
        <add-task v-on:task-updated="newItem = true" v-if="component === 'todos'" />
        <add-daily v-on:daily-updated="newItem = true" v-if="component === 'routines'" />
        <base-card :slug="component" :newItem="newItem" />
      </div>
      <div class="col-md-8">
        <div class="bg-primary full-height q-pa-lg">
          <div class="bg-white full-height">
            <task v-on:task-updated="newItem = true" v-if="component === 'todos'" />
            <daily v-on:daily-updated="newItem = true" v-if="component === 'routines'" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import task from './../components/views/Task.vue';
import daily from './../components/views/Daily.vue';
import baseCard from './../components/modules/lists/base-card.vue';
import addTask from './../components/forms/addTask.vue';
import addDaily from './../components/forms/addDaily.vue';

export default {
  components: {
    task,
    daily,
    'base-card': baseCard,
    'add-task': addTask,
    'add-daily': addDaily
  },
  data () {
    return {
      component: null,
      newItem: false
    }
  },
  methods: {
    setComponentType () {
      if (this.$route.path.indexOf('todos') >= 0) {
        this.component = 'todos';
      } else if (this.$route.path.indexOf('routines') >= 0) {
        this.component = 'routines';
      } else if (this.$route.path.indexOf('reminders') >= 0) {
        this.component = 'todos';
      }
    }
  },
  mounted () {
    this.setComponentType()
  }
}
</script>

<style>
</style>
