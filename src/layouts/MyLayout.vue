<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="q-pa-lg">
      <q-toolbar>
        <q-btn
          color="grey-4"
          text-color="purple"
          glossy
          unelevated
          :icon="menuOne == true ? 'favorite' : 'favorite_border'"
          label="Stuffz"
          @click="setMenu"
          :class="menuOne == true ? 'big' : 'small'"
          class="q-mr-sm"
          transition-show="jump-down"
          transition-hide="jump-up"
          to="/stuffz"
          style="height:40px"
        >
          <div class="big text-center on-right" v-if="menuOne == true"></div>
        </q-btn>
        <q-btn
          color="grey-4"
          text-color="purple"
          glossy
          unelevated
          :icon="menuTwo == true ? 'favorite' : 'favorite_border'"
          label="Thingz"
          @click="setMenu"
          :class="menuTwo == true ? 'big' : 'small'"
          transition-show="jump-down"
          transition-hide="jump-up"
          to="/thingz"
          style="height:40px"
        >
          <div class="big text-center on-right" v-if="menuTwo == true"></div>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',
  data () {
    return {
      activeMenu: null
    }
  },
  computed: {
    menuOne () {
      return this.$store.state.menuOne
    },
    menuTwo () {
      return this.$store.state.menuTwo
    }
  },
  methods: {
    setMenu: function () {
      this.$store.dispatch('setMenuState')
    }
  }
}
</script>

<style>
.big {
  width: 80%;
}
.small {
  width: 20%;
}
</style>
