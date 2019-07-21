<template>
  <div class="full-width full-height container">
    <div class="row">
      <div class="col-md-3">
        <div class="q-ma-lg q-pa-sm height-80 border-right overflow-x">
          <menu-toggle
            v-for="m in menus"
            :key="m.slug"
            :data="m"
            v-on:menu-toggle-changed="updateViews"
            :toggleOptions="toggleOptions"
            class="q-mb-sm"
          />
        </div>
      </div>
      <div class="col-md-9">
        <div class="q-ma-lg q-pa-sm height-80 overflow-x">
          <custom-card v-for="m in filteredMenus" :key="m.slugs" :data="m" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import menuToggle from './../components/modules/menu-toggle.vue';
import customCard from './../components/modules/custom-card.vue';

export default {
  components: {
    'menu-toggle': menuToggle,
    'custom-card': customCard
  },
  data () {
    return {
      toggleOptions: [
        { label: 'yes', value: 'yes' },
        { label: 'no', value: 'no' }
      ],
      menus: [
        {
          slug: 'reminders',
          label: 'Reminders',
          status: 'yes'
        },
        {
          slug: 'todos',
          label: 'ToDo',
          status: 'yes'
        }
      ]
    }
  },
  computed: {
    filteredMenus () {
      return this.menus.filter(i => i.status === 'yes')
    }
  },
  methods: {
    updateViews (view) {
      this.menus.map(i => {
        if (i.slug === view.slug) {
          i.status = view.status
        }
        return {
          slug: i.slug,
          label: i.label,
          status: i.status
        }
      })
    }
  }
}
</script>
