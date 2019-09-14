<template>
  <q-list class="toggle-box full-width">
    <q-item class="full-width">
      <div class="row full-width">
        <div class="col full-width">
          <small style="text-transform: uppercase">{{data.label}}</small>
          <q-btn-toggle
            class="full-width"
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
      toggleItem: this.data.status
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
