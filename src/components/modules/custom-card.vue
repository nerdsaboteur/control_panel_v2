<template>
  <q-card class="custom-card q-mb-sm">
    <q-card-section>
      <h5 class="text-grey q-mb-md q-pl-sm">{{ data.label }}</h5>

      <base-card :slug="data.slug" v-if="data.slug != 'bills'" />
      <base-card-bills v-else :slug="data.slug" />
    </q-card-section>
  </q-card>
</template>

<script>
import baseCard from './lists/base-card.vue';
import baseCardBills from './lists/base-card-bills.vue';

export default {
  props: ['data'],
  components: {
    'base-card': baseCard,
    'base-card-bills': baseCardBills
  },
  data () {
    return {}
  },
  methods: {}
}
</script>
