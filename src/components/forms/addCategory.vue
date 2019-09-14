<template>
  <q-list class="q-pa-lg full-width bg-white">
    <q-item>
      <span class="caption">Add Category</span>
    </q-item>
    <q-item class="row items-baseline justify-center">
      <div class="col-10">
        <q-input class="full-width" label="Name" v-model="label" />
      </div>
      <div class="col-2 q-pa-md">
        <q-btn class="full-width" color="purple" raised label="Create" @click="addItem" />
      </div>
    </q-item>
  </q-list>
</template>

<script>
export default {
  data () {
    return {
      label: null,
      updated: false
    }
  },
  watch: {
    updated () {
      console.log('watch updating')
      if (this.updated) {
        console.log('updating')
        this.$store.dispatch('getExpenseCategories')
        this.updated = false
      }
    }
  },
  computed: {
    expense_categories () {
      return this.$store.state.expense_categories
    }
  },
  methods: {
    addItem () {
      this.$store
        .dispatch('addExpenseCategory', { label: this.label })
        .then(() => {
          this.label = null
          this.updated = true
        })
    }
  },
  mounted () {
    this.$store.dispatch('getExpenseCategories')
  }
}
</script>

<style></style>
