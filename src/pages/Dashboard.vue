<template>
  <div class="full-width full-height">
    <div class="row wrap">
      <div class="col-lg-6 col-md-6 col-12 q-pa-md bg-primary">
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <div v-show="!visible">
            <custom-card class="q-mb-lg" :data="m" v-for="m in filteredTaskMenus" :key="m.slugs" />
          </div>
        </transition>
      </div>
      <div class="col-lg-6 col-md-6 col-12 q-pa-md bg-primary">
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <div v-show="!visible">
            <custom-card class="q-mb-lg" :data="m" v-for="m in filteredMoneyMenus" :key="m.slugs" />
          </div>
        </transition>
      </div>
    </div>
    <q-inner-loading class="loader" :showing="visible">
      <q-spinner-gears class="gears" color="positive" />
    </q-inner-loading>
  </div>
</template>

<script>
import customCard from "./../components/modules/custom-card.vue";

export default {
  components: {
    "custom-card": customCard
  },
  data() {
    return {
      visible: true,
      task_menus: [
        {
          slug: "reminders",
          label: "Reminders",
          status: "yes"
        },
        {
          slug: "remaining_todos",
          label: "Things to Do",
          status: "yes"
        }
      ],
      money_menus: [
        {
          slug: "bills_overdue",
          label: "Overdue Bills",
          status: "yes"
        },
        {
          slug: "bills",
          label: "Upcoming Bills",
          status: "yes"
        }
      ]
    };
  },
  methods: {
    showLoading() {
      this.visible = true;
      setTimeout(() => {
        if (
          this.filteredTaskMenus.length > 0 &&
          this.filteredMoneyMenus.length > 0
        ) {
          this.visible = false;
        }
      }, 800);
    }
  },
  computed: {
    filteredTaskMenus() {
      return this.task_menus.filter(i => i.status === "yes");
    },
    filteredMoneyMenus() {
      return this.money_menus.filter(i => i.status === "yes");
    }
  },
  mounted() {
    this.showLoading();
  }
};
</script>
