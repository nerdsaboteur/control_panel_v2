<template>
  <q-card class="no-borders">
    <div v-if="slug === 'routines'" class="bg-purple full-width text-white">
      <q-checkbox v-model="showCompleted" label="Include Completed Items" />
    </div>
    <q-card-section class="row nowrap justify-between" v-if="slug === 'routines'"></q-card-section>
    <q-card-section>
      <q-list class="inner-card">
        <q-item class="row justify-between" v-if="msg != null">
          <h5 class="text-grey">{{ msg }}</h5>
        </q-item>
        <q-item
          v-for="card in cardData"
          :key="card._id"
          class="bb-grey"
          clickable
          v-ripple
          @click="$router.replace(`/detail/${slug}/${card._id}`)"
        >
          <q-item-section>
            <q-item-label class="row nowrap justify-between items-center">
              <span>{{ card.title }}</span>
              <div v-if="slug === 'routines'">
                <i
                  v-if="card.completed === 'yes' && showCompleted"
                  class="material-icons text-subtitle1 width-50"
                  @click="updateDaily"
                >check_circle</i>
                <i v-else class="material-icons text-subtitle1 width-50">check_circle_outline</i>
              </div>
            </q-item-label>
            <q-item-label caption lines="1" class="row nowrap justify-between items-start">
              <span>{{ card.duedate}}</span>
              <q-badge v-if="slug != 'routines'" color="purple">{{ card.priority }}</q-badge>
            </q-item-label>
            <q-item-label v-if="slug === 'routines'">
              <span>{{ card.frequency}}</span>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
import moment from "moment";
import ControlPanelService from "./../../../services/ControlPanelService.js";

export default {
  props: ["slug", "newItem"],
  data() {
    return {
      cardData: [],
      msg: null,
      showCompleted: false
    };
  },
  watch: {
    slug() {
      this.getCardData();
    },
    newItem() {
      this.getCardData();
    },
    tasks() {
      this.loadData();
    },
    routines() {
      this.loadData();
    },
    showCompleted() {
      this.getCardData();
    }
  },
  computed: {
    tasks() {
      return this.$store.getters.tasks;
    },
    task() {
      return this.$store.getters.task;
    },
    routines() {
      return this.$store.getters.routines;
    },
    daily() {
      return this.$store.getters.daily;
    }
  },
  methods: {
    getCardData() {
      if (
        this.slug === "todos" ||
        this.slug === "reminders" ||
        this.slug === "remaining_todos"
      ) {
        this.$store.dispatch("getTasks");
      } else if (this.slug === "routines") {
        this.$store.dispatch("getRoutines");
      }
    },
    loadData() {
      this.msg = null;
      if (this.slug === "reminders") {
        this.cardData = this.tasks.filter(i => parseInt(i.reminder) === 1);
      } else if (this.slug === "todos") {
        this.cardData = this.tasks;
      } else if (this.slug === "remaining_todos") {
        this.cardData = this.tasks.filter(i => parseInt(i.reminder) != 1);
      } else if (this.slug === "routines") {
        if (!this.showCompleted) {
          this.cardData = this.routines.filter(i => i.completed != "yes");
        } else {
          this.cardData = this.routines;
        }
      }

      if (this.cardData.length === 0) {
        this.msg = "No items found";
      }
    },
    updateDaily() {
      ControlPanelService.updateDaily(this.cardData._id, this.cardData)
        .then(() => {})
        .catch(e => console.log("error : " + e));
    }
  },
  mounted() {
    this.getCardData();
  }
};
</script>
