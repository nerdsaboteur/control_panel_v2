<template>
  <q-item>
    <q-item-section>
      <div class="q-my-lg">
        <dialog-form
          :dataType="dataType"
          :viewData="calendarData"
          @dialog-close="$emit('dialog-close')"
          v-if="dataType.type === 'create' || dataType.type === 'edit'"
        />
        <dialog-view
          :viewData="calendarData"
          v-if="dataType.type === 'view'"
          @dialog-close="$emit('dialog-close')"
        />
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
import moment from "moment";
import dialogForm from "./dialog-form.vue";
import dialogView from "./dialog-view.vue";

export default {
  props: {
    dataType: Object
  },
  components: {
    "dialog-form": dialogForm,
    "dialog-view": dialogView
  },
  data() {
    return {
      //create: false,
      //edit: false,
      //showStart: false,
      //showEnd: false,
      //summary: null,
      //description: null,
      //location: null,
      //start: moment().format("YYYY-D-MM h:mm"),
      //end: moment().format("YYYY-D-M h:mm")
    };
  },

  computed: {
    // calendarClicked() {
    //   return this.$store.state.calendarClicked;
    // },
    calendarData() {
      return this.$store.state.calendarData;
    }
  },
  watch: {
    // calendarClicked() {
    //   this.edit = true;
    //   this.$store.commit("setCalendarClicked", false);
    // }
  }
  //   mounted() {
  //     this.$root.$on("click-event-CALENDAR", function(eventDetailObject) {
  //       // console.log(JSON.stringify(eventDetailObject))
  //       this.$store.commit("setCalendarClicked", true);
  //       this.$store.commit("setCalendarData", eventDetailObject);
  //     });
  //   }
};
</script>
