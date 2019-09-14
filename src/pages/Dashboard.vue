<template>
  <div class="full-width full-height">
    <div class="row wrap">
      <div class="col-6 q-pa-md bg-primary">
        <custom-card class="q-mb-lg" :data="m" v-for="m in filteredTaskMenus" :key="m.slugs" />
      </div>
      <div class="col-6 q-pa-md bg-primary">
        <custom-card class="q-mb-lg" :data="m" v-for="m in filteredMoneyMenus" :key="m.slugs" />
      </div>
    </div>
  </div>
</template>

<script>
import customCard from './../components/modules/custom-card.vue';

export default {
  components: {
    'custom-card': customCard
  },
  data () {
    return {
      task_menus: [
        {
          slug: 'reminders',
          label: 'Reminders',
          status: 'yes'
        },
        {
          slug: 'remaining_todos',
          label: "ToDo's",
          status: 'yes'
        }
      ],
      money_menus: [
        {
          slug: 'bills',
          label: 'Upcoming Bills',
          status: 'yes'
        }
      ]
    }
  },
  computed: {
    filteredTaskMenus () {
      return this.task_menus.filter(i => i.status === 'yes')
    },
    filteredMoneyMenus () {
      return this.money_menus.filter(i => i.status === 'yes')
    }
  }
}
</script>
