<template>
  <div class="full-width full-height container">
    <div class="row">
      <div class="col-md-3">
        <div class="q-ma-lg q-pa-sm height-80 border-right overflow-x">
          <menu-toggle
            title="reminders"
            v-on:menu-toggle-changed="updateViews"
            :toggleOptions="toggleOptions"
          />
        </div>
      </div>
      <div class="col-md-9">
        <div class="q-ma-lg q-pa-sm height-80 overflow-x">
          <q-card class="custom-card glossy" v-if="reminders === 'yes'">
            <q-card-section>
              <q-expansion-item expand-separator icon="favorite_border" label="Reminders">
                <q-card>
                  <q-card-section>
                    <q-list class="inner-card" bordered>
                      <q-item
                        v-for="contact in contacts"
                        :key="contact.id"
                        class="q-my-sm"
                        clickable
                        v-ripple
                      >
                        <q-item-section>
                          <div color="primary" text-color="white">{{ contact.letter }}</div>
                        </q-item-section>

                        <q-item-section>
                          <q-item-label>{{ contact.name }}</q-item-label>
                          <q-item-label caption lines="1">{{ contact.email }}</q-item-label>
                        </q-item-section>

                        <q-item-section side>
                          <q-icon name="chat_bubble" color="green" />
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import menuToggle from './../components/modules/menu-toggle.vue';

export default {
  components: {
    'menu-toggle': menuToggle
  },
  data () {
    return {
      reminders: 'yes',
      toggleOptions: [
        { label: 'yes', value: 'yes' },
        { label: 'no', value: 'no' }
      ],
      contacts: [
        {
          id: 1,
          name: 'Ruddy Jedrzej',
          email: 'rjedrzej0@discuz.net',
          letter: 'R'
        },
        {
          id: 2,
          name: 'Mallorie Alessandrini',
          email: 'malessandrini1@marketwatch.com',
          letter: 'M'
        },
        {
          id: 3,
          name: 'Elisabetta Wicklen',
          email: 'ewicklen2@microsoft.com',
          letter: 'E'
        },
        {
          id: 4,
          name: 'Seka Fawdrey',
          email: 'sfawdrey3@wired.com',
          letter: 'S'
        }
      ]
    }
  },
  methods: {
    updateViews (view) {
      if (view.title === 'reminders') {
        this.reminders = view.value
      }
    }
  }
}
</script>
