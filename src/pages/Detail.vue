<template>
  <div>
    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div v-show="!visible">
        <div class="full-width full-height">
          <div class="row wrap bg-primary">
            <div class="col-lg-4 col-md-4 col-12 q-pl-md q-pt-sm">
              <add-task v-on:task-updated="newItem = true" v-if="component === 'todos'" />
              <add-daily v-on:daily-updated="newItem = true" v-if="component === 'routines'" />
              <base-card :slug="component" :newItem="newItem" />
            </div>
            <div class="col-lg-8 col-md-8 col-sm-12">
              <div class="bg-primary full-height q-px-lg">
                <div class="bg-white full-height">
                  <task v-on:task-updated="newItem = true" v-if="component === 'todos'" />
                  <daily v-on:daily-updated="newItem = true" v-if="component === 'routines'" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <q-inner-loading class="loader" :showing="visible">
      <q-spinner-gears class="gears" color="positive" />
    </q-inner-loading>
  </div>
</template>

<script>
import task from "./../components/views/Task.vue";
import daily from "./../components/views/Daily.vue";
import baseCard from "./../components/modules/lists/base-card.vue";
import addTask from "./../components/forms/addTask.vue";
import addDaily from "./../components/forms/addDaily.vue";

export default {
  components: {
    task,
    daily,
    "base-card": baseCard,
    "add-task": addTask,
    "add-daily": addDaily
  },
  data() {
    return {
      component: null,
      newItem: false,
      visible: true
    };
  },
  watch: {
    newItem() {
      this.$nextTick(() => {
        this.showLoading(400);
        this.newItem = false;
      });
    }
  },
  methods: {
    setComponentType() {
      if (this.$route.path.indexOf("todos") >= 0) {
        this.component = "todos";
      } else if (this.$route.path.indexOf("routines") >= 0) {
        this.component = "routines";
      } else if (this.$route.path.indexOf("reminders") >= 0) {
        this.component = "todos";
      }
    },
    showLoading(time) {
      this.visible = true;
      setTimeout(() => {
        this.visible = false;
      }, time);
    }
  },
  mounted() {
    this.showLoading(800);
    this.setComponentType();
  }
};
</script>

<style>
</style>
