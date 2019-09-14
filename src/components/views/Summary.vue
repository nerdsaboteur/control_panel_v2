<template>
  <q-card class="q-mb-lg">
    <div class="row">
      <div class="col-6 text-center q-pa-md bg-primary">
        <big>Paid $ {{ total_expenses_paid }}</big>
      </div>
      <div class="col-6 text-center q-pa-md bg-primary">
        <big>UnPaid ${{total_expenses_unpaid}}</big>
      </div>
    </div>
    <q-card>
      <div class="row">
        <div class="col-6 q-pa-sm">
          <q-card>
            <q-card-section>
              <q-item
                class="full-width justify-between bg-white"
                v-for="e in expenses_paid"
                :key="e._id"
                label="Paid"
              >
                <q-item-section class="col-10">
                  <router-link :to="`detail/expenses/${e._id}`">{{ e.label }}</router-link>
                </q-item-section>
                <q-item-section>{{ e.actual }}</q-item-section>
              </q-item>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-6 q-pa-sm">
          <q-card>
            <q-card-section>
              <q-item
                class="full-width col-6 justify-between bg-white"
                v-for="e in expenses_unpaid"
                :key="e._id"
              >
                <q-item-section class="col-10">
                  <router-link :to="`detail/expenses/${e._id}`">{{ e.label }}</router-link>
                </q-item-section>
                <q-item-section>{{ e.projected }}</q-item-section>
              </q-item>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-card>
  </q-card>
</template>

<script>
export default {
  data () {
    return {
      expenses_paid: [],
      expenses_unpaid: [],
      total_expenses_paid: 0,
      total_expenses_unpaid: 0
    }
  },
  watch: {
    active_expenses () {
      this.total_expenses_paid = 0
      this.total_expenses_unpaid = 0
      this.expenses_paid = []
      this.expenses_unpaid = []

      this.expenses_paid = this.active_expenses.filter(i => i.paid === 'yes')
      this.expenses_unpaid = this.active_expenses.filter(i => i.paid === 'no')

      this.expenses_paid.forEach(i => {
        this.total_expenses_paid += Number(i.actual)
      })

      this.total_expenses_paid = Number(this.total_expenses_paid).toFixed(2)
      this.expenses_unpaid.forEach(i => {
        this.total_expenses_unpaid += Number(i.projected)
      })

      this.total_expenses_unpaid = Number(this.total_expenses_unpaid).toFixed(
        2
      )
    }
  },
  computed: {
    active_expenses () {
      return this.$store.state.active_expenses
    }
  },
  mounted () {
    this.$store.dispatch('getExpenses')
  }
}
</script>

<style>
</style>
