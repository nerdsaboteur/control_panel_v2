<template>
  <q-card class="bg-white">
    <q-card-section>
      <q-list class="full-width row justify-between">
        <q-item class="col-4">
          <q-item-section>
            <q-input v-model="expense.label" label="Name" />
          </q-item-section>
        </q-item>
        <q-item class="col-4">
          <q-item-section>
            <q-input v-model="expense.projected" label="Projected" />
          </q-item-section>
        </q-item>
        <q-item class="col-4">
          <q-item-section>
            <q-input v-model="expense.actual" label="Actual" />
          </q-item-section>
        </q-item>
        <q-item class="col-4">
          <q-select class="full-width" v-model="expense.category" :options="categories" />
        </q-item>
        <q-item class="col-4">
          <q-item-section>
            <date-picker v-model="expense.duedate" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-btn color="purple" raised @click="addExpense" label="Create" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
import Datepicker from 'vuejs-datepicker';

export default {
  props: {
    categories: Array
  },
  components: {
    'date-picker': Datepicker
  },
  data () {
    return {
      expense: {
        label: null,
        projected: null,
        actual: null,
        duedate: new Date(),
        category: null,
        recurrance: 0,
        active: 'yes',
        paid: 'no'
      }
    }
  },
  methods: {
    addExpense () {
      this.$store.dispatch('addExpense', this.expense).then(() => {
        this.resetFields()
        //this.$store.dispatch('getExpenses')
      })
    },
    resetFields () {
      this.expense.category = null
      this.expense.label = null
      this.expense.projected = null
      this.expense.actual = null
      this.expense.duedate = null
      this.expense.recurrance = 0
      this.$emit('expense-added')
    }
  }
}
</script>
