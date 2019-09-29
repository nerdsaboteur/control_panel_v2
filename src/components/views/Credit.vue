<template>
  <div class="row nowrap justify-between q-mb-lg">
    <div class="col-12 q-mb-md">
      <q-card>
        <q-card-section>
          <h5 class="q-pl-md">Credit</h5>
          <q-list>
            <q-item class="row bg-white q-pa-md">
              <q-item-section>
                <q-card class="bg-white no-borders">
                  <q-card-section>
                    <add-credit />
                  </q-card-section>
                </q-card>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-card class="no-borders" v-if="revolving_credit.length > 0">
                  <q-card-section>
                    <q-card class="q-mb-md no-borders">
                      <q-card-section>
                        <h6 class="q-mb-sm text-grey">Revolving lines of credit</h6>
                        <q-card
                          class="bg-white no-borders"
                          style="border-bottom:1px solid #ccc!important"
                        >
                          <q-card-section>
                            <div class="row q-pa-sm">
                              <div class="col text-center">Payments</div>
                              <div class="col text-center">Available</div>
                              <div class="col text-center">Owed</div>
                              <div class="col text-center">Limit</div>
                            </div>
                            <div class="row q-pa-sm">
                              <div class="col text-center">${{ payment_total }}</div>
                              <div class="col text-center">${{ available_total }}</div>
                              <div class="col text-center">${{ balance_total }}</div>
                              <div class="col text-center">${{ limit_total }}</div>
                            </div>
                          </q-card-section>
                        </q-card>
                      </q-card-section>
                      <q-card-section>
                        <div v-for="(c, index) in revolving_credit" :key="index">
                          <credit-item :credit_item="c" slug="revolving" />
                        </div>
                      </q-card-section>
                    </q-card>
                    <q-card class="no-borders" v-if="loans.length > 0">
                      <q-card-section>
                        <h6 class="q-mb-sm text-grey">Loans and Debt</h6>
                        <q-card
                          class="bg-white no-borders"
                          style="border-bottom:1px solid #ccc!important"
                        >
                          <q-card-section>
                            <div class="row q-pa-sm">
                              <div class="col text-center">Payment</div>
                              <div class="col text-center">Owed</div>
                              <div class="col text-center">Payoff Months</div>
                            </div>
                            <div class="row q-pa-sm">
                              <div class="col text-center">${{ loan_payment_total }}</div>
                              <div class="col text-center">${{ loan_balance_total }}</div>
                              <div class="col text-center">${{ payoff }}</div>
                            </div>
                          </q-card-section>
                        </q-card>
                      </q-card-section>
                      <q-card-section>
                        <div v-for="(c, index) in loans" :key="index">
                          <credit-item :credit_item="c" slug="loan" />
                        </div>
                      </q-card-section>
                    </q-card>
                  </q-card-section>
                </q-card>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import AddCredit from "./../../components/forms/addCredit.vue";
import CreditItem from "./../../components/modules/lists/line-card.vue";

export default {
  components: {
    "credit-item": CreditItem,
    "add-credit": AddCredit
  },
  data() {
    return {
      payoff: 0
    };
  },
  computed: {
    credit() {
      return this.$store.state.credit;
    },
    revolving_credit() {
      if (this.credit) {
        return this.credit
          .filter(i => i.revolving === "yes")
          .sort((a, b) => (a.label < b.label ? -1 : 1));
      }
    },
    loans() {
      if (this.credit) {
        return this.credit
          .filter(i => i.revolving === "no")
          .sort((a, b) => (a.label < b.label ? -1 : 1));
      }
    },
    limit_total() {
      if (this.revolving_credit) {
        let limit = [];
        this.revolving_credit.map(i =>
          i.creditlimit > 0 ? limit.push(i.creditlimit) : null
        );
        const reducer = (accumulator, currentValue) =>
          Number(accumulator) + Number(currentValue);

        return limit.reduce(reducer, 0);
      }
    },
    available_total() {
      if (this.revolving_credit) {
        let available = [];
        this.revolving_credit.map(i =>
          i.creditavailable > 0 ? available.push(i.creditavailable) : null
        );
        const reducer = (accumulator, currentValue) =>
          Number(accumulator) + Number(currentValue);

        return available.reduce(reducer, 0);
      }
    },
    balance_total() {
      if (this.revolving_credit) {
        let balance = [];
        this.revolving_credit.map(i =>
          i.creditbalance > 0 ? balance.push(i.creditbalance) : null
        );
        const reducer = (accumulator, currentValue) =>
          Number(accumulator) + Number(currentValue);

        return balance.reduce(reducer, 0);
      }
    },
    loan_balance_total() {
      if (this.loans) {
        let balance = [];
        this.loans.map(i =>
          i.creditbalance > 0 ? balance.push(i.creditbalance) : null
        );
        const reducer = (accumulator, currentValue) =>
          Number(accumulator) + Number(currentValue);

        return balance.reduce(reducer, 0);
      }
    },
    payment_total() {
      if (this.revolving_credit) {
        let paymentsdue = [];
        this.revolving_credit.map(i =>
          i.paymentdue > 0 ? paymentsdue.push(i.paymentdue) : null
        );
        const reducer = (accumulator, currentValue) =>
          Number(accumulator) + Number(currentValue);

        return paymentsdue.reduce(reducer, 0);
      }
    },
    loan_payment_total() {
      if (this.loans) {
        let paymentsdue = [];
        this.loans.map(i =>
          i.paymentdue > 0 ? paymentsdue.push(i.paymentdue) : null
        );
        const reducer = (accumulator, currentValue) =>
          Number(accumulator) + Number(currentValue);

        return paymentsdue.reduce(reducer, 0);
      }
    }
  },
  created() {
    this.$store.dispatch("getCredit");
  }
};
</script>
