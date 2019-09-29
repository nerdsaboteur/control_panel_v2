<template>
  <q-expansion-item v-model="expanded" label="Add Savings">
    <q-card class="row full-width full-height">
      <q-list class="row no-wrap full-width" style="width:100%important;">
        <q-item class="col-10 q-pa-md">
          <q-input class="full-width" label="account" v-model="account" />
        </q-item>
        <q-item class="col q-pa-md">
          <q-btn
            style="height:24px!important"
            label="create"
            color="purple"
            raised
            @click="insertAccount()"
          />
        </q-item>
      </q-list>
    </q-card>
  </q-expansion-item>
</template>

<script>
export default {
  data() {
    return {
      account: null,
      expanded: false
    };
  },
  methods: {
    insertAccount() {
      let savings = {
        account: this.account,
        amount: 0,
        payment_type: ""
      };
      this.$store.dispatch("insertSavings", savings).then(() => {
        this.account = null;
        this.expanded = false;
        this.$store.dispatch("getSavings");
      });
    }
  }
};
</script>
