<template>
  <q-card class="row full-width bg-primary q-pa-lg">
    <q-card-section class="col-12" v-if="!loading && current_expense">
      <h5 class="text-grey q-ml-lg q-mb-lg">Expense Detail</h5>
      <q-card>
        <q-card-section>
          <div class="row wrap justify-between">
            <q-select
              class="col-6 q-pa-md"
              :options="categories"
              label="Category"
              v-model="current_expense.category"
            />
            <q-field class="col-6 q-pa-md">
              <q-input v-model="current_expense.label" label="Name" />
            </q-field>

            <q-field class="col-4 q-pa-md">
              <q-input v-model="current_expense.projected" label="Projected" />
            </q-field>

            <q-field class="col-4 q-pa-md">
              <q-input v-model="current_expense.actual" label="Actual" />
            </q-field>

            <date-picker v-model="current_expense.duedate" class="col-4 q-mt-lg" />
          </div>
        </q-card-section>
        <!-- </q-card>
        <q-card>-->
        <q-card-section class="row justify-around">
          <q-toggle
            label="Paid"
            color="primary"
            false-value="no"
            true-value="yes"
            v-model="current_expense.paid"
            v-if="current_expense.paid"
          />

          <q-toggle
            label="Active"
            color="primary"
            false-value="no"
            true-value="yes"
            v-model="current_expense.active"
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
                @click="deleteExpense(current_expense._id)"
              />
            </div>

            <div class="col text-right">
              <q-btn
                class="q-ma-sm"
                color="purple"
                raised
                label="Save"
                @click="updateExpense(current_expense._id,
                  {
                    category: current_expense.category,
                    label: current_expense.label,
                    projected: current_expense.projected,
                    actual: current_expense.actual,
                    duedate: current_expense.duedate,
                    nextdate: current_expense.nextdate,
                    paid: current_expense.paid,
                    active: current_expense.active,
                    recurrance: 0
                  }
                  )"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-card-section>
  </q-card>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import moment from 'moment';

export default {
  components: {
    'date-picker': Datepicker
  },
  data () {
    return {
      loading: true
    }
  },
  computed: {
    expense () {
      return this.$store.state.expense
    },
    current_expense () {
      if (this.expense) {
        let expense = this.$store.state.expense[0]
        return expense
      }
    },
    expense_categories () {
      return this.$store.state.expense_categories
    },
    categories () {
      return this.expense_categories.map(r => r.label)
    }
  },
  methods: {
    updateExpense (id, expense) {
      expense._id = id
      expense.duedate = moment(expense.duedate, 'YYYYMMDD')
      expense.nextdate = new Date()

      this.$store.dispatch('updateExpense', expense).then(() => {
        this.$router.replace('/budget')
        this.$store.dispatch('getExpenses')
      })
    },
    deleteExpense (id) {
      this.$store.dispatch('deleteExpense', id).then(() => {
        this.$router.replace('/budget')
        this.$store.dispatch('getExpenses')
      })
    }
  },
  mounted () {
    this.$store.dispatch('getExpense', this.$route.params.id).then(r => {
      this.$store
        .dispatch('getExpenseCategories', this.$route.params.id)
        .then(r => (this.loading = false))
    })
  }
}
</script>
