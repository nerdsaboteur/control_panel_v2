<template>
  <q-list class="row full-width justify-around items-baseline">
    <input type="checkbox" @click="deleteIncome(income_item._id)" />
    <q-input label="Title" v-model="income_item.title"></q-input>
    <q-input label="Amount" v-model="income_item.amount"></q-input>
    <date-picker v-model="income_item.duedate"></date-picker>
    <q-btn
      v-if="meta === 'actual'"
      color="purple"
      raised
      label="Save"
      @click="
                  updateIncome(income_item._id, {
                    title: income_item.title,
                    duedate: income_item.duedate,
                    amount: income_item.amount,
                    type: meta
                  })
                "
    />
    <q-btn
      v-else
      color="purple"
      raised
      label="Update"
      @click="
                  updateIncome(income_item._id, {
                    title: income_item.title,
                    duedate: income_item.duedate,
                    amount: income_item.amount,
                    type: meta
                  })
                "
    />
  </q-list>
</template>

<script>
import ControlPanelService from './../../services/ControlPanelService.js';
import Datepicker from 'vuejs-datepicker';

export default {
  components: {
    'date-picker': Datepicker
  },
  props: {
    income_item: Object,
    meta: String
  },
  methods: {
    updateIncome (id, income) {
      ControlPanelService.updateIncome(id, income)
        .then(() => this.$emit('income_updated', 1))
        .catch(err => console.log(err))
    },
    deleteIncome (id) {
      ControlPanelService.deleteIncome(id)
        .then(() => this.$emit('income_updated', 1))
        .catch(err => console.log(err))
    }
  }
}
</script>
