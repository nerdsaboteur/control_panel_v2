<template>
  <q-card class="q-mb-sm custom-card glossy">
    <q-card-section>
      <q-expansion-item expand-separator icon="favorite_border" :label="data.label">
        <base-card :slug="data.slug" />
      </q-expansion-item>
    </q-card-section>
  </q-card>
</template>

<script>
import baseCard from './lists/base-card.vue';

export default {
  props: ['data'],
  components: {
    'base-card': baseCard
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style>
</style>
