<template>
  <q-expansion-item class="full-width" v-model="expanded" label="Add Credit">
    <q-card>
      <q-card-section>
        <div class="row">
          <div class="col-4 q-pa-sm">
            <q-input label="card name" v-model="label" />
          </div>
          <div class="col-4 q-pa-sm">
            <date-picker v-model="paymentduedate" />
          </div>
          <div class="col-4 q-pa-sm">
            <q-input label="payment due" v-model="paymentdue" />
          </div>
          <div class="col-4 q-pa-sm">
            <q-input label="available" v-model="creditavailable" />
          </div>
          <div class="col-4 q-pa-sm">
            <q-input label="owed" v-model="creditbalance" />
          </div>
          <div class="col-4 q-pa-sm">
            <q-input label="limit" v-model="creditlimit" />
          </div>
          <div class="col-4 q-pa-sm">
            <label>Revoling line of credit?</label>
            <q-radio v-model="revolving" val="yes" label="Yes" />
            <q-radio v-model="revolving" val="no" label="No" />
          </div>
          <div class="col-3 q-pa-sm">
            <q-btn color="purple" raised label="Create" @click="insertCredit()" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script>
import Datepicker from 'vuejs-datepicker';

export default {
  components: {
    'date-picker': Datepicker
  },
  data () {
    return {
      label: null,
      creditlimit: null,
      creditbalance: null,
      creditavailable: null,
      paymentdue: null,
      paymentduedate: null,
      paid: true,
      credit_item: null,
      expanded: false,
      revolving: 'yes'
    }
  },
  methods: {
    insertCredit () {
      let credit = {
        label: this.label,
        paymentduedate: this.paymentduedate,
        creditbalance: this.creditbalance,
        creditavailable: this.creditavailable,
        paymentdue: this.paymentdue,
        creditlimit: this.creditlimit,
        revolving: this.revolving
      }
      this.$store.dispatch('insertCredit', credit)
      this.resetFields()
    },
    resetFields () {
      this.label = null
      this.paymentduedate = null
      this.creditbalance = null
      this.creditavailable = null
      this.paymentdue = null
      this.creditlimit = null
      this.revolving = 'yes';
    }
  }
  // computed: {
  //   credit () {
  //     return this.$store.state.credit
  //   }
  // }
}
</script>
