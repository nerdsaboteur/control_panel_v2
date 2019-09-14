<template>
  <div></div>
</template>

<script>
export default {
  watch: {
    current_routine () {
      this.$router.replace(`/detail/routines/${this.current_routine._id}`)
    }
  },
  computed: {
    routines () {
      return this.$store.state.routines
    },
    current_routine () {
      if (this.routines) {
        return this.routines[0]
      }
    }
  },
  mounted () {
    this.$store.dispatch('getRoutines')
  }
}
</script>
