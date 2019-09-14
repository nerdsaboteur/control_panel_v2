<template>
  <q-list>
    <q-item class="row justify-between" v-for="s in savings" :key="s._id">
      <div class="col q-pa-sm">
        <input type="checkbox" @click="deleteSavings(s._id)" />
      </div>
      <div class="col q-pa-sm">
        <q-input label="Account" v-model="s.account" />
      </div>
      <div class="col q-pa-sm">
        <q-input label="Amount" v-model="s.amount" />
      </div>
      <div class="col q-pa-sm">
        <q-btn
          color="purple"
          raised
          label="Update"
          @click="updateSavings(s._id, { account: s.account, amount: s.amount })"
        />
      </div>
    </q-item>
  </q-list>
</template>

<script>
export default {
  data () {
    return {
      account: null,
      amount: null
    }
  },
  methods: {
    updateSavings (id, savings) {
      savings._id = id
      this.$store
        .dispatch('updateSavings', savings)
        .then(() => this.$store.dispatch('getSavings'))
    },
    deleteSavings (id) {
      this.$store
        .dispatch('deleteSavings', id)
        .then(() => this.$store.dispatch('getSavings'))
    }
  },
  computed: {
    savings () {
      return this.$store.state.savings
    }
  },
  mounted () {
    this.$store.dispatch('getSavings')
  }
}
</script>
