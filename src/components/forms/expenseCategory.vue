<template>
  <div class="bg-white q-pa-lg">
    <!-- <q-expansion-item class="col-12" v-model="expanded" :label="cat"> -->
    <h5 class="q-mb-lg">{{cat}}</h5>
    <q-card class="no-borders" v-if="expense_by_category.length === 0">
      <h6 class="text-grey">No records found</h6>
    </q-card>

    <q-card class="row full-width bg-white no-borders">
      <q-card-section class="col-12">
        <q-expansion-item
          v-for="expense in expense_by_category"
          :key="expense._id"
          @click="current_expense = expense"
          :label="expense.label"
        >
          <q-card class="text-grey no-borders">
            <q-card-section v-if="expense._id === current_expense._id">
              <div class="row justify-between">
                <q-field>
                  <q-input v-model="expense.label" label="Name" />
                </q-field>

                <q-field>
                  <q-input v-model="expense.projected" label="Projected" />
                </q-field>

                <q-field>
                  <q-input v-model="expense.actual" label="Actual" />
                </q-field>
                <q-field class="q-pa-md">
                  <small class="full-width" style="color:#333;font-weight:400">Due Date</small>
                  <date-picker
                    style="position:relative;left:-100px"
                    class="full-width no-borders q-mt-lg"
                    label="Due Date"
                    v-model="expense.duedate"
                  />
                </q-field>
              </div>
            </q-card-section>

            <q-card-section>
              <q-card-section>
                <q-card>
                  <q-card-section>
                    <div class="caption">Recurrance</div>
                  </q-card-section>
                  <q-card-section>
                    <div class="row">
                      <div class="col-6">
                        <q-option-group
                          :options="options"
                          label="Recurrance"
                          type="radio"
                          v-model="expense.recurrance"
                        />
                      </div>
                      <div class="col-6">
                        <label>Next Date</label>
                        <date-picker v-model="expense.nextdate" />
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </q-card-section>
            </q-card-section>
            <q-card-section class="row justify-around">
              <q-toggle
                label="Paid"
                color="primary"
                false-value="no"
                true-value="yes"
                v-model="expense.paid"
              />

              <q-toggle
                label="Active"
                color="primary"
                false-value="no"
                true-value="yes"
                v-model="expense.active"
              />
            </q-card-section>
            <q-card-section>
              <div class="row justify-between">
                <div class="col text-left">
                  <q-btn
                    class="q-ma-sm"
                    color="purple"
                    raised
                    label="Delete"
                    @click="deleteExpense(expense._id)"
                  />
                </div>

                <div class="col text-right">
                  <q-btn
                    class="q-ma-sm"
                    color="purple"
                    raised
                    label="Save"
                    @click="updateExpense(expense._id,
                  {
                    label: expense.label,
                    projected: expense.projected,
                    actual: expense.actual,
                    duedate: expense.duedate,
                    nextdate: expense.nextdate,
                    paid: expense.paid,
                    active: expense.active,
                    recurrance: expense.recurrance
                  }
                  )"
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-card-section>
    </q-card>
    <!-- </q-expansion-item> -->
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import moment from "moment";

export default {
  props: {
    cat: String
  },
  components: {
    "date-picker": Datepicker
  },
  watch: {
    cat() {
      if (this.cat != null) {
        this.$store.dispatch("getExpensesByCategory", this.cat);
      }
    }
  },
  computed: {
    expense_by_category() {
      return this.$store.state.expense_by_category;
    }
  },
  data() {
    return {
      expense: {
        label: null,
        projected: null,
        actual: null,
        duedate: null,
        paid: null
      },
      current_expense: {},
      expanded: true,
      group: "0",
      options: [
        { label: "None", value: "0" },
        { label: "Once a month on a certain date", value: "1" },
        { label: "Every 14 days", value: "2" },
        { label: "Set manually", value: "3" }
      ]
    };
  },
  methods: {
    updateExpense(id, expense) {
      expense._id = id;
      expense.category = this.cat;
      if (expense.recurrance === "0") {
        expense.nextdate = moment(new Date(), "YYYYMMDD");
      } else if (expense.recurrance === "1") {
        let current = moment(expense.nextdate, "YYYYMMDD");
        let day = current.format("D");
        let dayOfMonth = parseInt(day) + 1;

        let today = moment(new Date(), "YYYYMMDD");
        var month = today.format("M");
        if (month === "12") {
          month = 1;
        } else {
          month = parseInt(month) + 1;
        }
        // var day = today.format('D')
        var year = today.format("YYYY");
        let dateStr = month + "/" + dayOfMonth + "/" + year;

        expense.nextdate = moment(dateStr, "MM/DD/YYYY");
      } else if (expense.recurrance == "2") {
        // calculate on 14 days
        expense.nextdate = moment()
          .add(14, "days")
          .calendar();
      } else if (expense.recurrance == "3") {
        expense.duenextdate = moment(expense.nextdate, "YYYYMMDD");
      }
      // console.log(JSON.stringify(expense))
      this.$store.dispatch("updateExpense", expense);
    },
    deleteExpense(id) {
      this.$store.dispatch("deleteExpense", id);
    }
  },
  mounted() {
    if (this.cat != null) {
      this.$store.dispatch("getExpensesByCategory", this.cat);
    }
  }
};
</script>
