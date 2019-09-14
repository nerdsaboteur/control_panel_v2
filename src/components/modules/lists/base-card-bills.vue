<template>
  <q-card>
    <q-card-section>
      <q-list class="inner-card">
        <q-item class="row text-center" v-if="msg != null">
          <h5 class="text-grey">{{ msg }}</h5>
        </q-item>
        <q-item
          v-for="card in cardData"
          :key="card._id"
          class="bb-grey"
          clickable
          v-ripple
          @click="$router.replace(`/detail/expenses/${card._id}`)"
        >
          <!-- {{card }} -->
          <q-item-section>
            <div class="row wrap">
              <div class="col-6 text-left">
                <span>{{ card.label }}</span>
              </div>
              <div class="col-6 text-right">
                <span>${{ card.projected }}</span>
              </div>
              <div class="col-12 text-left">
                <span>{{ card.duedate }}</span>
              </div>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: ['slug'],
  data () {
    return {
      msg: null,
      showCompleted: false
    }
  },
  computed: {
    active_expenses () {
      return this.$store.state.active_expenses
    },
    cardData () {
      if (this.active_expenses) {
        let exp = this.active_expenses.sort((a, b) =>
          new Date(a.duedate) > new Date(b.duedate) ? -1 : 1
        )
        return exp.filter((i, index) => index < 10)
      }
    }
  },
  mounted () {
    this.$store.dispatch('getExpenses')
  }
}
</script>
