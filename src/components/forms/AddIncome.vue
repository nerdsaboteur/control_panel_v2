<template>
  <q-card>
    <q-card-section>
      <q-list class="row justify-around items-baseline">
        <q-input label="Title" v-model="income_title"></q-input>
        <q-input label="Amount" v-model="income_amount"></q-input>
        <date-picker v-model="income_duedate" />
        <q-select
          style="min-width:200px"
          v-model="income_type"
          :options="income_options"
          label="Income Type"
        />
        <!-- <i class="far fa-save fa-lg" @click="addIncome"></i> -->
        <q-btn color="purple" raised label="Create" @click="addIncome" />
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
import ControlPanelService from "./../../services/ControlPanelService.js";
import Datepicker from "vuejs-datepicker";

export default {
  components: {
    "date-picker": Datepicker
  },
  data() {
    return {
      show: false,
      income_title: null,
      income_duedate: null,
      income_amount: null,
      income_type: null,
      income_options: ["actual", "projected"]
    };
  },
  methods: {
    addIncome() {
      let income = {
        title: this.income_title,
        duedate: this.income_duedate,
        amount: this.income_amount,
        type: this.income_type
      };
      ControlPanelService.addIncome(income)
        .then(() => this.resetFields())
        .catch(err => console.log(err));
    },
    resetFields() {
      this.show = false;
      this.income_title = "";
      this.income_duedate = "";
      this.income_amount = "";
      this.income_type = "";
      this.$emit("income_updated");
    }
  }
};
</script>
