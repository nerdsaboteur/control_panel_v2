<template>
  <q-list class="rounded-borders">
    <q-item>
      <q-item-section>
        <div class="row full-width justify-between">
          <q-card class="col q-pa-md q-ma-sm bg-primary">
            <div class="row nowrap justify-around text-center">
              <small class="full-width">Income</small>
              <big class="full-width">{{total_actual_income}}</big>
            </div>
          </q-card>

          <q-card class="col q-pa-md q-ma-sm bg-primary">
            <div class="row nowrap justify-around text-center">
              <small class="full-width">Expense</small>
              <big class="full-width">{{expense_total}}</big>
            </div>
          </q-card>
          <q-card class="col q-pa-md q-ma-sm bg-primary">
            <div class="row nowrap justify-around text-center">
              <small class="full-width">Paid</small>
              <big class="full-width">{{expense_total_paid}}</big>
            </div>
          </q-card>
          <q-card class="col q-pa-md q-ma-sm bg-primary">
            <div class="row nowrap justify-around text-center">
              <small class="full-width">UnPaid</small>
              <big class="full-width">{{expense_total_unpaid}}</big>
            </div>
          </q-card>
          <q-card class="col q-pa-md q-ma-sm bg-primary">
            <div class="row nowrap justify-around text-center">
              <small class="full-width">Balance</small>
              <big class="full-width">{{final_balance}}</big>
            </div>
          </q-card>
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  data () {
    return {
      show: true,
      expense_total: 0,
      expense_total_paid: 0,
      expense_total_unpaid: 0,
      final_balance: 0
    }
  },
  watch: {
    active_expenses () {
      // paid
      let total = 0
      this.expense_total_paid = this.active_expenses.filter(
        i => i.paid === 'yes'
      )
      this.expense_total_paid.forEach(i => {
        total += Number(i.actual)
      })
      this.expense_total_paid = Number(total).toFixed(2)
      // unpaid
      total = 0
      this.expense_total_unpaid = this.active_expenses.filter(
        i => i.paid === 'no'
      )
      this.expense_total_unpaid.forEach(i => {
        total += Number(i.projected)
      })
      this.expense_total_unpaid = Number(total).toFixed(2)
      this.expense_total =
        Number(this.expense_total_paid) + Number(this.expense_total_unpaid)
      this.expense_total = Number(this.expense_total).toFixed(2)
      this.getBalance()
    }
  },
  methods: {
    getBalance () {
      this.final_balance = this.total_actual_income - this.expense_total
      this.final_balance = Number(this.final_balance).toFixed(2)
    },
    calculateTotals () {}
  },
  computed: {
    total_actual_income () {
      return Number(this.$store.state.total_actual_income).toFixed(2)
    },
    income_actual () {
      return this.$store.state.income_actual
    },
    active_expenses () {
      return this.$store.state.active_expenses
    }
  },
  mounted () {
    console.log('mounted')
    // this.calculateTotals()
    this.$store.dispatch('getIncomes')
    this.$store.dispatch('getExpenses')
  }
}
</script>
