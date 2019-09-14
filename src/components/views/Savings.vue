<template>
  <q-card>
    <q-card-section>
      <q-list>
        <q-item>
          <q-item-section>
            <h5>Savings</h5>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-card class="bg-primary">
              <q-card-section>
                <add-savings />
              </q-card-section>
            </q-card>
          </q-item-section>
        </q-item>
        <!-- <q-item>
      <q-item-section>
        <savings-edit />
      </q-item-section>
        </q-item>-->
        <q-item>
          <q-item-section>
            <q-card>
              <q-card-section>
                <savings-item />
              </q-card-section>
            </q-card>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
import addSavings from './../../components/forms/addSavings.vue';
import savingsItem from './../../components/modules/lists/line-card-savings.vue';
import savingsEdit from './../../components/forms/editSavings.vue';

export default {
  components: {
    'add-savings': addSavings,
    'savings-item': savingsItem,
    'savings-edit': savingsEdit
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
