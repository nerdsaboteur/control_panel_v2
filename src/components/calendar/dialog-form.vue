<template>
  <div>
    <q-field label="Summary" class="full-width">
      <!-- <h5>view {{ view_data}}</h5> -->
      <q-input v-model="summary" />
    </q-field>
    <q-field label="Description" class="full-width">
      <q-input v-model="description" />
    </q-field>
    <q-field label="Location" class="full-width">
      <q-input v-model="location" />
    </q-field>
    <q-field class="row nowrap full-width justify-between">
      <div class="col q-mb-lg">
        <q-btn @click="showStart=!showStart" label="Start" dense flat icon="add" />
      </div>
      <div class="col q-mb-lg" v-if="dataType.type === 'edit'">
        <p class="text-grey">{{formatDate(start)}}</p>
      </div>
    </q-field>
    <q-field v-if="showStart==true" class="row nowrap full-width">
      <div class="col items-end">
        <q-date
          class="col full-width"
          v-model="start"
          landscape
          mask="YYYY-MM-DD HH:mm"
          color="purple"
        />
        <q-time class="col full-width" v-model="start" mask="YYYY-MM-DD HH:mm" color="purple" />
      </div>
    </q-field>
    <q-field class="row nowrap full-width justify-between">
      <div class="col q-mb-lg">
        <q-btn @click="showEnd=!showEnd" label="End" dense flat icon="add" />
      </div>
      <div class="col q-mb-lg" v-if="dataType.type === 'edit'">
        <p class="text-grey">{{formatDate(end)}}</p>
      </div>
    </q-field>
    <q-field v-if="showEnd==true" class="row nowrap full-width">
      <div class="col items-end">
        <q-date
          class="col full-width"
          landscape
          v-model="end"
          mask="YYYY-MM-DD HH:mm"
          color="purple"
        />
        <q-time
          class="col full-width"
          landscape
          v-model="end"
          mask="YYYY-MM-DD HH:mm"
          color="purple"
        />
      </div>
    </q-field>
    <q-btn
      v-if="dataType.type === 'create'"
      @click="createEvent"
      color="purple"
      class="col q-my-lg"
      style="float:right"
      label="Create"
    ></q-btn>
    <q-btn
      v-if="dataType.type === 'edit'"
      @click="editEvent"
      color="purple"
      class="col q-my-lg"
      style="float:right"
      label="Update"
    ></q-btn>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["viewData", "dataType"],
  // {
  //   viewData: Array || Object,
  //   dataType: Object
  // }
  data() {
    return {
      showStart: false,
      showEnd: false,
      summary: null,
      description: null,
      location: null,
      start: moment().format("YYYY-MM-DD HH:mm"),
      end: moment().format("YYYY-MM-DD HH:mm"),
      view_data: {}
    };
  },

  methods: {
    formatDate(value) {
      return moment(value).format("LLL");
    },
    createEvent() {
      let start = moment(this.start);
      let end = moment(this.end);

      const event = {
        summary: this.summary,
        description: this.description,
        location: this.location,
        start: start.toISOString(),
        end: end.toISOString()
      };

      this.$store.dispatch("insertEvent", event);
      this.$emit("dialog-close");
    },
    editEvent() {
      const event = {
        id: this.viewData.id,
        summary: this.summary,
        description: this.description,
        location: this.location,
        start: this.start,
        end: this.end
      };
      this.$store.dispatch("updateEvent", event);
      this.$emit("dialog-close");
    }
  },
  mounted() {
    if (this.dataType.type === "edit") {
      this.view_data = this.viewData;
      this.summary = this.view_data.summary;
      this.description = this.view_data.description;
      this.location = this.view_data.location;
      this.start = this.view_data.start.dateTime;
      this.end = this.view_data.end.dateTime;
    }
  }
};
</script>
