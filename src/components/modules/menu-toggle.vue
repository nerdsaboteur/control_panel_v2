<template>
  <q-list class="toggle-box border-rounded border-rounded glossy">
    <q-item>
      <div class="row">
        <div class="col-6 q-pt-sm">{{ data.label }}</div>
        <div class="col-6">
          <q-btn-toggle
            v-model="toggleItem"
            spread
            no-caps
            toggle-color="purple"
            color="white"
            text-color="black"
            :options="toggleOptions"
            @click="updateToggle"
          />
        </div>
      </div>
    </q-item>
  </q-list>
</template>

<script>
export default {
  props: ['data', 'toggleOptions'],
  data () {
    return {
      toggleItem: 'yes'
    }
  },
  methods: {
    updateToggle () {
      this.$emit('menu-toggle-changed', {
        slug: this.data.slug,
        status: this.toggleItem
      })
    }
  }
}
</script>
