<template>
  <q-list>
    <q-item>
      <q-item-section v-if="slug === 'revolving'">
        <div class="row nowrap">
          <div class="col">
            <input style="width:30px" type="checkbox" @click="deleteCredit(credit_item._id)" />
          </div>
          <div class="col">
            <q-input label="Name" v-model="credit_item.label" @click="show_extended = 1" />
          </div>
          <div class="col q-px-sm" style="padding-top:3px;">
            <small class="text-grey">Due Date</small>
            <date-picker style="border-bottom:1px solid #ccc" v-model="credit_item.paymentduedate" />
          </div>

          <div class="col">
            <q-input label="Payment Due" v-model="credit_item.paymentdue" />
          </div>
          <div class="col">
            <q-input label="Available" v-model="credit_item.creditavailable" />
          </div>
          <div class="col">
            <q-input label="Owed" v-model="credit_item.creditbalance" />
          </div>
          <div class="col" v-if="credit_item.revolving === 'yes'">
            <q-input label="Limit" v-model="credit_item.creditlimit" />
          </div>
          <div class="col">
            <q-toggle
              label="Paid"
              color="pink"
              false-value="no"
              true-value="yes"
              v-model="credit_item.paid"
            />
          </div>
          <div class="col">
            <q-btn
              label="Update"
              color="purple"
              raised
              @click="
                    updateCredit({
                      _id: credit_item._id,
                      label: credit_item.label,
                      paymentduedate: credit_item.paymentduedate,
                      creditbalance: credit_item.creditbalance,
                      creditavailable: credit_item.creditavailable,
                      paymentdue: credit_item.paymentdue,
                      creditlimit: credit_item.creditlimit,
                      paid: credit_item.paid,
                      revolving: credit_item.revolving
                    })
                  "
            ></q-btn>
          </div>
        </div>
      </q-item-section>
      <q-item-section v-else>
        <div class="row nowrap">
          <div class="col">
            <input style="width:30px" type="checkbox" @click="deleteCredit(credit_item._id)" />
          </div>
          <div class="col">
            <q-input label="Name" v-model="credit_item.label" @click="show_extended = 1" />
          </div>
          <div class="col q-px-sm" style="padding-top:3px;">
            <small class="text-grey">Due Date</small>
            <date-picker style="border-bottom:1px solid #ccc" v-model="credit_item.paymentduedate" />
          </div>

          <div class="col">
            <q-input label="Payment Due" v-model="credit_item.paymentdue" />
          </div>

          <div class="col">
            <q-input label="Owed" v-model="credit_item.creditbalance" />
          </div>

          <div class="col q-pl-lg q-mt-sm text-center">
            <q-label class="q-pb-lg text-grey">Payoff</q-label>
            <div
              v-if="parseFloat(credit_item.paymentdue) != 0"
              style="border-bottom:1px solid #ccc;padding-bottom:4px"
            >
              <q-label
                class="text-primary"
              >{{ Math.floor(credit_item.creditbalance / credit_item.paymentdue) }} months</q-label>
            </div>
            <div
              v-else
              class="text-primary"
              style="border-bottom:1px solid #ccc;padding-bottom:4px"
            >0</div>
          </div>

          <!-- <div class="col">
            <q-toggle
              label="Paid"
              color="pink"
              false-value="no"
              true-value="yes"
              v-model="credit_item.paid"
            />
          </div>-->
          <div class="col q-ml-md">
            <q-btn
              class="q-mt-md"
              label="Update"
              color="purple"
              raised
              @click="
                    updateCredit({
                      _id: credit_item._id,
                      label: credit_item.label,
                      paymentduedate: credit_item.paymentduedate,
                      creditbalance: credit_item.creditbalance,
                      creditavailable: credit_item.creditavailable,
                      paymentdue: credit_item.paymentdue,
                      creditlimit: credit_item.creditlimit,
                      paid: credit_item.paid,
                      revolving: credit_item.revolving
                    })
                  "
            ></q-btn>
          </div>
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import Datepicker from "vuejs-datepicker";

export default {
  components: {
    "date-picker": Datepicker
  },
  props: { credit_item: Object, slug: String },
  methods: {
    updateCredit(credit) {
      this.$store.dispatch("updateCredit", credit);
    },
    deleteCredit(id) {
      this.$store.dispatch("deleteCredit", id);
    }
  },
  computed: {
    credit() {
      return this.$store.state.credit;
    }
  }
};
</script>

<style>
</style>
