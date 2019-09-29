<template>
  <q-list class="bg-white">
    <q-item>
      <div class="row">
        <div class="col-6" v-for="(c, index) in categories" :key="index">
          <div class="row q-pa-lg items-baseline">
            <div class="col-1">
              <input type="checkbox" @click="deleteItem(c._id)" />
            </div>
            <div class="col-10 q-px-md">
              <q-input label="Name" v-model="c.label" />
            </div>
            <div class="col-1">
              <q-btn
                color="purple"
                raised
                label="Save"
                @click="updateItem({id: c._id, label: c.label})"
              />
            </div>
          </div>
        </div>
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
  computed: {
    expense_categories () {
      return this.$store.state.expense_categories
    },
    categories () {
      if (this.expense_categories) {
        return this.expense_categories.sort((a, b) =>
          a.label < b.label ? -1 : 1
        )
      }
    }
  },
  methods: {
    updateItem (category) {
      this.$store.dispatch('updateCategory', category)
    },
    deleteItem (id) {
      this.$store.dispatch('deleteCategory', id)
    }
  },
  mounted () {
    this.$store.dispatch('getExpenseCategories')
  }
}
</script>

<style></style>
