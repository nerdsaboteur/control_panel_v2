<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page>
        <q-header>
          <q-toolbar class="row justify-between q-py-lg q-px-md">
            <q-btn-group>
              <q-btn
                class="q-pa-md"
                @click="$router.replace('/dashboard')"
                color="secondary"
                glossy
                label="Dashboard"
              />
              <q-btn @click="$router.replace('/todos')" color="secondary" glossy label="ToDo's" />
              <q-btn
                @click="$router.replace('/routines')"
                color="secondary"
                glossy
                label="Routines"
              />
              <q-btn @click="$router.replace('/budget')" color="secondary" glossy label="Budget" />
            </q-btn-group>
            <q-btn color="purple" raised :label="btnLabel" class="q-pa-md" />
          </q-toolbar>
        </q-header>
        <q-card class="no-borders bg-secondary full-height">
          <q-card-section>
            <router-view />
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import moment from 'moment';

export default {
  computed: {
    btnLabel () {
      return moment().format('MMMM Do YYYY, h:mm:ss a')
    }
  }
}
</script>
