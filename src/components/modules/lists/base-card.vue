<template>
  <q-card>
    <q-card-section>
      <q-list class="inner-card" bordered>
        <q-item v-if="cardData.length == 0">
          <h5>No items found</h5>
        </q-item>
        <q-item v-else v-for="card in cardData" :key="card._id" class="q-my-sm" clickable v-ripple>
          <q-item-section>
            <q-item-label>{{ card.title }}</q-item-label>
            <q-item-label caption lines="1">{{ card.duedate }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-icon name="edit" color="green" @click="$router.replace(`/detail/task/${card._id}`)" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
import axios from 'axios';

export default {
  props: ['slug'],
  data () {
    return {
      cardData: []
    }
  },
  methods: {
    getCardData () {
      this.$axios
        .get('http://localhost:8088/tasks')
        .then(r => {
          if (this.slug === 'reminders') {
            this.cardData = r.data.filter(i => parseInt(i.reminder) === 1)
          } else {
            this.cardData = r.data
          }
        })
        .catch(e => console.log('error : ' + e))
    }
  },
  created () {
    this.getCardData()
  }
}
</script>

<style>
</style>
