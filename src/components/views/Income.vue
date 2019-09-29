<template>
  <q-card class="row nowrap justify-between">
    <q-list class="full-width">
      <q-item>
        <q-item-section>
          <h5 class="q-mb-sm">Income</h5>
          <q-card class="bg-white no-borders">
            <q-card-section>
              <q-expansion-item
                v-model="expanded"
                dense
                dense-toggle
                expand-separator
                label="Add Income"
              >
                <add-income v-on:income_updated="checkIncome" />
              </q-expansion-item>
            </q-card-section>
          </q-card>
        </q-item-section>
      </q-item>
      <q-item v-if="income_projected.length > 0">
        <q-item-section>
          <q-card class="no-borders">
            <q-card-section>
              <form-card
                incomeType="Projected"
                :incomes="income_projected"
                :totalIncome="total_projected_income"
                v-if="income_projected.length > 0"
                v-on:income_updated="checkIncome"
              />
            </q-card-section>
          </q-card>
        </q-item-section>
      </q-item>
      <q-item v-if="income_actual.length > 0">
        <q-item-section>
          <q-card class="no-borders">
            <q-card-section>
              <form-card
                incomeType="Actual"
                :incomes="income_actual"
                :totalIncome="total_actual_income"
                v-if="income_actual.length > 0"
                v-on:income_updated="checkIncome"
              />
            </q-card-section>
          </q-card>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
import AddIncome from "components/forms/AddIncome.vue";
import formCard from "components/modules/lists/form-card.vue";

export default {
  components: {
    "add-income": AddIncome,
    "form-card": formCard
  },
  data() {
    return {
      expanded: false
    };
  },
  methods: {
    checkIncome() {
      this.expanded = false;
      this.$store.dispatch("getIncomes");
    }
  },
  computed: {
    total_actual_income() {
      return Number(this.$store.state.total_actual_income).toFixed(2);
    },
    income_projected() {
      return this.$store.state.income_projected;
    },
    income_actual() {
      return this.$store.state.income_actual;
    },
    total_projected_income() {
      return Number(this.$store.state.total_projected_income).toFixed(2);
    }
  },
  mounted() {
    this.$store.dispatch("getIncomes");
  }
};
</script>
