<template>
  <div class="container">
    <q-list>
      <q-item class="row justify-start">
        <q-btn
          class="q-mr-sm"
          label="Payment"
          color="purple"
          raised
          @click="payment_type = 'payment'"
        />
        <q-btn
          class="q-mr-sm"
          label="Withdrawl"
          color="purple"
          raised
          @click="payment_type = 'withdrawal'"
        />
        <q-btn
          class="q-mr-sm"
          label="Transfer"
          color="purple"
          raised
          @click="payment_type = 'transfer'"
        />
      </q-item>
      <q-item>
        <h5>{{ payment_type }}</h5>
      </q-item>
    </q-list>

    <!--payment or withdrawal-->
    <div
      v-if="payment_type === 'payment' || payment_type === 'withdrawal'"
      class="row box-block mb-2 border border-outline-dark"
    >
      <div class="col-1"></div>
      <div class="col-7 p-0">
        <select v-model="account">
          <option v-for="(a, index) in accounts" :key="index" :value="a">{{ a }}</option>
        </select>
      </div>
      <div class="col-2 p-0">
        <input type="number" placeholder="amount" v-model="amount" />
      </div>
      <div class="col-1">
        <i class="fas fa-save fa-lg" @click="insertSavings()"></i>
      </div>
    </div>
    <!--payment or withdrawal-->

    <!--transfer-->
    <div v-if="payment_type === 'transfer'" class="row box-block mb-2 border border-outline-dark">
      <div class="col-4 p-0">
        <label>
          transfer from
          <select v-model="from_account">
            <option v-for="(a, index) in accounts" :key="index" :value="a">{{ a }}</option>
          </select>
        </label>
      </div>
      <div class="col-4 p-0">
        <label>
          transfer to
          <select v-model="to_account">
            <option v-for="(a, index) in accounts" :key="index" :value="a">{{ a }}</option>
          </select>
        </label>
      </div>
      <div class="col-2 p-0">
        <label>
          amount
          <input type="number" v-model="new_amount" />
        </label>
      </div>
      <div class="col-1">
        <i class="fas fa-save fa-lg" @click="insertSavings()"></i>
      </div>
      <div class="col-1">
        <i class="fas fa-edit fa-lg" @click="addAccount = !addAccount"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      account: '',
      new_account: '',
      from_account: '',
      to_account: '',
      amount: '',
      new_amount: 0,
      addAccount: false,
      payment_types: ['payment', 'transfer', 'withdrawal'],
      payment_type: 'payment',
      transaction: {}
    }
  },
  methods: {},
  computed: {
    savings () {
      return this.$store.state.savings
    },
    accounts () {
      return this.$store.state.accounts
    },
    balance () {
      return this.$store.state.balance
    },
    transactions () {
      return this.$store.state.transactions
    }
  },
  mounted () {
    this.$store.dispatch('getSavings')
  }
}
</script>

<style>
input[type="text"] {
  width: 100%;
}
input[type="number"] {
  width: 100%;
  min-height: 39px;
  border: 1px solid #eee;
}
</style>
