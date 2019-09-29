<template>
  <q-card class="no-borders">
    <q-card-section>
      <q-list class="inner-card">
        <q-item class="row text-center" v-if="msg != null">
          <h5 class="text-grey">{{ msg }}</h5>
        </q-item>
        <div v-if="cardData.length > 0">
          <q-item
            v-for="card in cardData"
            :key="card._id"
            class="bb-grey"
            clickable
            v-ripple
            @click="$router.replace(`/detail/expenses/${card._id}`)"
          >
            <q-item-section>
              <q-item-label class="row nowrap justify-between items-center">
                <div class="col-6 text-left">
                  <span>{{ card.label }}</span>
                </div>
                <div class="col-6 text-right">
                  <span>${{ card.projected }}</span>
                </div>
              </q-item-label>
              <q-item-label caption lines="1" class="row nowrap justify-between items-start">
                <span>{{ formatDate(card.duedate) }}</span>
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>
        <div v-else>
          <q-item-label class="q-pa-sm">
            <h6>No items found</h6>
          </q-item-label>
        </div>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
import moment from "moment";
export default {
  props: ["slug"],
  data() {
    return {
      msg: null,
      showCompleted: false
    };
  },
  computed: {
    active_expenses() {
      return this.$store.state.active_expenses;
    },
    cardData() {
      if (this.active_expenses) {
        if (this.slug === "bills_overdue") {
          return this.active_expenses
            .filter((i, index) => {
              return i.paid != "yes" && moment(i.duedate).isBefore(new Date());
            })
            .sort((a, b) =>
              new Date(a.duedate) > new Date(b.duedate) ? -1 : 1
            );
        } else {
          return this.active_expenses
            .filter((i, index) => {
              return (
                i.paid != "yes" &&
                moment(new Date(i.duedate)).isAfter(new Date())
              );
            })
            .sort((a, b) =>
              new Date(a.duedate) > new Date(b.duedate) ? -1 : 1
            );
        }
      }
    }
  },
  methods: {
    formatDate(value) {
      return moment(value).format("MM/DD/YYYY");
    }
  },
  mounted() {
    this.$store.dispatch("getExpenses");
  }
};
</script>
