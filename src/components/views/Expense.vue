<template>
  <div class="row nowrap justify-between borders q-mb-lg">
    <div class="col-12 q-mb-md">
      <q-card>
        <q-card-section>
          <q-list>
            <q-item>
              <q-item-section>
                <big>Expenses</big>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-card class="bg-white no-borders">
                  <q-card-section>
                    <q-expansion-item v-model="add_expanded" label="Add Expense">
                      <add-expense :categories="categories" v-on:expense-added="goToList" />
                    </q-expansion-item>
                  </q-card-section>
                </q-card>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-card class="bg-white no-borders">
                  <q-card-section>
                    <q-expansion-item v-model="cat_expanded" label="Expense Categories">
                      <add-category />
                      <edit-categories />
                    </q-expansion-item>
                  </q-card-section>
                </q-card>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-card class="bg-white no-borders">
                  <q-card-section class="row">
                    <div class="col-6 q-pa-md">
                      <q-btn
                        class="q-pa-md full-width bg-secondary text-white"
                        @click="goToList"
                        label="List View"
                      />
                    </div>
                    <div class="col-6 q-pa-md">
                      <q-select
                        label="Expense Categories"
                        class="bg-white text-grey q-pl-sm full-width"
                        v-model="category"
                        :options="categories"
                      />
                    </div>
                  </q-card-section>
                </q-card>
              </q-item-section>
            </q-item>
            <q-item>
              <q-card class="row full-width q-pa-lg bg-primary no-borders">
                <q-card-section class="col-12">
                  <expense-list class="bg-white" v-if="listView == true" />
                  <expense-category :cat="category" v-if="listView == false" />
                </q-card-section>
              </q-card>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import AddExpense from "components/forms/AddExpense.vue";
import AddCategory from "components/forms/AddCategory.vue";
import EditCategories from "components/forms/EditCategories.vue";
import ExpenseList from "components/modules/expense-list.vue";
import ExpenseCategory from "components/forms/expenseCategory.vue";

export default {
  components: {
    "expense-category": ExpenseCategory,
    "add-category": AddCategory,
    "edit-categories": EditCategories,
    "add-expense": AddExpense,
    "expense-list": ExpenseList
  },
  data() {
    return {
      category: null,
      showExpenseSection: true,
      listView: true,
      add_expanded: false,
      cat_expanded: false
    };
  },
  watch: {
    category() {
      this.listView = false;
    }
  },
  computed: {
    expense_categories() {
      return this.$store.state.expense_categories;
    },
    categories() {
      if (this.expense_categories) {
        return this.expense_categories
          .map(r => r.label)
          .sort((a, b) => (a < b ? -1 : 1));
      }
    },
    expenses() {
      return this.$store.state.expenses;
    }
  },
  methods: {
    goToList() {
      this.listView = true;
      this.add_expanded = false;
      this.$store.dispatch("getExpenses");
    }
  },
  mounted() {
    this.$store.dispatch("getExpenseCategories");
  }
};
</script>

<style></style>
