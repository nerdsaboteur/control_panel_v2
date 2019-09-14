<template>
  <div></div>
</template>

<script>
export default {
  watch: {
    current_task () {
      this.$router.replace(`/detail/todos/${this.current_task._id}`)
    }
  },
  computed: {
    tasks () {
      return this.$store.state.tasks
    },
    current_task () {
      if (this.tasks) {
        return this.tasks[0]
      }
    }
  },
  mounted () {
    this.$store.dispatch('getTasks')
  }
}
</script>
