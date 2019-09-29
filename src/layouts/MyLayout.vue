<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page>
        <q-header style="border-bottom:1px solid #B3B6B7;box-shadow:0px 1px 0px 1px #ABB2B9">
          <q-toolbar class="row justify-between q-py-lg q-px-md">
            <q-btn-group class="q-ml-md">
              <q-btn
                class="q-pa-md menu-btn"
                @click="$router.replace('/dashboard')"
                color="secondary"
                glossy
                label="Dashboard"
              />
              <q-btn
                @click="$router.replace('/todos')"
                color="secondary"
                glossy
                label="ToDo"
                class="menu-btn"
              />
              <!-- <q-btn
                @click="$router.replace('/routines')"
                color="secondary"
                glossy
                label="Routines"
              />-->
              <q-btn
                @click="$router.replace('/budget')"
                color="secondary"
                glossy
                label="Budget"
                class="menu-btn"
              />
            </q-btn-group>
            <big class="text-secondary text-bold optional-md">{{btnLabel}}</big>
            <q-btn-group class="on-right no-borders">
              <q-btn color="primary" glossy raised class="q-pa-md" @click="$router.replace('/')">
                <i class="material-icons bg-purple">account_circle</i>
              </q-btn>
              <q-btn
                color="purple"
                glossy
                raised
                class="q-pa-md q-ml-sm"
                @click="$router.replace('/calendar')"
              >
                <i class="material-icons bg-purple">calendar_view_day</i>
              </q-btn>
            </q-btn-group>
          </q-toolbar>
        </q-header>
        <q-card class="no-borders bg-primary full-width full-height">
          <q-card-section>
            <router-view />
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import moment from "moment";

export default {
  computed: {
    btnLabel() {
      return moment().format("MMMM Do YYYY, h:mm:ss a");
    }
  }
};
</script>
