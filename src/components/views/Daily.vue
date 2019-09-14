<template>
  <div class="q-pa-md q-mr-lg q-mt-lg">
    <q-card class="full-width" style="border:none">
      <q-card-section>
        <div class="row">
          <div class="col">
            <edit-daily v-on:daily-updated="dailyUpdated = true" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import editDaily from './../forms/editDaily.vue';

export default {
  components: {
    'edit-daily': editDaily
  },
  data () {
    return {
      dailyUpdated: false
    }
  },
  watch: {
    dailyUpdated () {
      if (this.dailyUpdated) {
        this.$emit('daily-updated')
      }
    }
  }
}
</script>
