<template>
  <div class="full-width full-height bg-primary">
    <div class="row">
      <div class="col">
        <div class="q-ma-lg q-pa-sm full-height">
          <q-card class="rounded-borders">
            <q-card-section>
              <balance />
            </q-card-section>
          </q-card>
          <q-card class="bg-secondary q-pa-sm q-ma-sm">
            <q-card-section>
              <q-option-group
                class="text-white"
                v-model="panel"
                inline
                :options="[
          { label: 'Summary', value: 'summary' },
          { label: 'Income', value: 'income' },
          { label: 'Expenses', value: 'expenses' },
          { label: 'Credit', value: 'credit' },
          { label: 'Savings', value: 'savings' }
        ]"
              />
            </q-card-section>
          </q-card>

          <q-tab-panels v-model="panel" animated class="shadow-2 rounded-borders">
            <q-tab-panel name="summary">
              <div>
                <summary-component />
              </div>
            </q-tab-panel>

            <q-tab-panel name="income">
              <div>
                <income-component />
              </div>
            </q-tab-panel>

            <q-tab-panel name="expenses">
              <div>
                <expense-component />
              </div>
            </q-tab-panel>
            <q-tab-panel name="credit">
              <div>
                <credit-component />
              </div>
            </q-tab-panel>
            <q-tab-panel name="savings">
              <div>
                <savings-component />
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import menuToggle from './../components/modules/menu-toggle.vue';
import customCard from './../components/modules/custom-card.vue';
import balance from './../components/views/balance.vue';
import summary from './../components/views/summary.vue';
import income from './../components/views/income.vue';
import expense from './../components/views/expense.vue';
import credit from './../components/views/credit.vue';
import savings from './../components/views/savings.vue';

export default {
  components: {
    'menu-toggle': menuToggle,
    'custom-card': customCard,
    balance,
    'summary-component': summary,
    'income-component': income,
    'expense-component': expense,
    'credit-component': credit,
    'savings-component': savings
  },
  data () {
    return {
      show_summary: false,
      show_income: false,
      show_expense: false,
      show_credit: false,
      show_savings: false,
      toggleOptions: [
        { label: 'yes', value: 'yes' },
        { label: 'no', value: 'no' }
      ],
      menus: [
        {
          slug: 'balance',
          label: 'Balance',
          status: 'yes'
        },
        {
          slug: 'summary',
          label: 'Summary',
          status: 'yes'
        },
        {
          slug: 'income',
          label: 'Income',
          status: 'yes'
        },
        {
          slug: 'expense',
          label: 'Expense',
          status: 'yes'
        },
        {
          slug: 'credit',
          label: 'Credit',
          status: 'yes'
        },
        {
          slug: 'savings',
          label: 'Savings',
          status: 'yes'
        }
      ],
      panel: 'summary'
    }
  },
  computed: {
    filteredMenus () {
      return this.menus.filter(i => i.status === 'yes')
    }
  },
  methods: {
    updateViews (view) {
      this.menus.map(i => {
        if (i.slug === view.slug) {
          i.status = view.status
        }
        return {
          slug: i.slug,
          label: i.label,
          status: i.status
        }
      })
    }
  }
}
</script>
