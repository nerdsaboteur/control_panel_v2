<template>
  <div>
    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div v-show="!visible">
        <div style="height:12px" class="row col justify-end items-end">
          <q-btn
            style="position:relative;top:20px"
            class="bg-purple q-mr-sm"
            color="white"
            label="Create"
            raised
            glossy
            icon="add"
            @click="setType('create')"
          />
        </div>

        <calendar
          event-ref="CALENDAR"
          :start-date="new Date()"
          :prevent-event-detail="true"
          :allow-editing="true"
          :event-array="event_data"
          :render-html="true"
          class="full-height"
        />
        <q-dialog v-model="open" persistent v-if="boxType.type != null">
          <q-card class="full-width q-pa-lg">
            <div class="row justify-between q-pb-md bb-grey">
              <h6 v-if="boxType.type==='view'">View Event</h6>
              <h6 v-if="boxType.type==='edit'">Edit Event</h6>
              <h6 v-if="boxType.type==='create'">Create Event</h6>
              <q-btn style="float:right" label="Close" dense flat icon="close" v-close-popup />
            </div>
            <div class="row justify-between q-mt-md">
              <q-btn
                v-if="boxType.type!='create'"
                label="View"
                dense
                flat
                icon="visibility"
                color="purple"
                @click="setType('view')"
              />
              <q-btn
                v-if="boxType.type!='create'"
                label="Edit"
                dense
                flat
                icon="edit"
                color="purple"
                @click="setType('edit')"
              />
              <q-btn
                v-if="boxType.type==='edit'"
                label="Delete"
                dense
                flat
                icon="delete_outline"
                color="purple"
                @click="setType('delete')"
              />
            </div>

            <modal :dataType="boxType" @dialog-close="handleModalUpdate" />
          </q-card>
        </q-dialog>
      </div>
    </transition>

    <q-inner-loading class="loader" :showing="visible">
      <q-spinner-gears class="gears" color="positive" />
    </q-inner-loading>
  </div>
</template>

<script>
import { DaykeepCalendar } from "@daykeep/calendar-quasar";
import moment from "moment";
import dialog from "./../components/calendar/dialog.vue";
import ControlPanelService from "./../services/ControlPanelService.js";
export default {
  components: {
    calendar: DaykeepCalendar,
    modal: dialog
  },
  data() {
    return {
      visible: true,
      open: false,
      event_data: [],
      boxType: {
        type: "view",
        name: "View"
      }
    };
  },
  methods: {
    handleModalUpdate() {
      this.showLoading(600);
      this.getAllEvents();
      this.$nextTick(() => {
        this.getAllEvents();
      });
      this.setDefaults();
    },
    getAllEvents() {
      let c = 0;
      let t = 1;
      let start = null;
      let end = null;
      ControlPanelService.getAllEvents()
        .then(res => {
          this.$store.commit("setEventData", res.data);

          this.event_data = res.data.map(i => {
            c++;
            t++;
            start = moment(i.start.dateTime);
            end = moment(i.end.dateTime);

            return {
              id: i._id,
              summary: i.summary,
              description: i.description,
              location: i.location,
              start: {
                dateTime: start.toISOString("UTC"),
                timeZone: start.timeZone
              },
              end: {
                dateTime: end.toISOString("UTC"),
                timeZone: end.timeZone
              },
              color: "purple",
              category: "work"
            };
          });
        })

        .catch(err => console.log(err));
    },
    setType(type) {
      if (type === "delete") {
        this.$store.dispatch("deleteEvent", this.calendarData.id);
        ControlPanelService.deleteEvent(this.calendarData.id).then(res => {
          this.getAllEvents();
          this.setDefaults();
        });
        return;
      }

      let name = type.charAt(0).toUpperCase() + type.substr(1, type.length + 1);
      const data = {
        type,
        name
      };
      this.boxType = data;
      this.open = true;
    },
    setDefaults() {
      this.open = false;
      this.boxType.type = "view";
      this.boxType.name = "View";
    },
    showLoading(time) {
      this.visible = true;
      setTimeout(() => {
        this.visible = false;
      }, time);
    }
  },
  computed: {
    calendarClicked() {
      return this.$store.state.calendarClicked;
    },
    calendarData() {
      return this.$store.state.calendarData;
    },
    eventData() {
      return this.$store.state.eventData;
    }
  },
  watch: {
    calendarClicked() {
      this.open = true;
      this.boxType.type = "view";
      this.boxType.name = "View";
      this.$store.commit("setCalendarClicked", false);
    }
  },
  mounted() {
    this.getAllEvents();
    this.showLoading(800);
    this.$root.$on("click-event-CALENDAR", function(eventDetailObject) {
      console.log("ROOT CLICK");

      //console.log(JSON.stringify(eventDetailObject));
      this.$store.commit("setCalendarClicked", true);
      this.$store.commit("setCalendarData", eventDetailObject);
    });
  }
};
</script>
