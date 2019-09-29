<template>
  <div>
    <q-list>
      <q-item class="row justify-between">
        <q-item-section class="col">Summary</q-item-section>
        <q-item-section class="col">{{viewData.summary}}</q-item-section>
      </q-item>
      <q-item class="row justify-between">
        <q-item-section class="col">Description</q-item-section>
        <q-item-section class="col">{{viewData.description}}</q-item-section>
      </q-item>
      <q-item class="row justify-between">
        <q-item-section class="col">Location</q-item-section>
        <q-item-section class="col">{{viewData.location}}</q-item-section>
      </q-item>
      <!-- <q-item>
        <q-item-side>Start</q-item-side>
        <q-item-main>{{viewData.start.dateTime || new Date()}}</q-item-main>
      </q-item>
      <q-item>
        <q-item-side>Start</q-item-side>
        <q-item-main>{{viewData.end.dateTime || new Date()}}</q-item-main>
      </q-item>-->

      <q-item>
        <q-btn
          @click="$emit('dialog-close')"
          color="purple"
          class="col q-my-lg"
          style="float:right"
          label="Close"
        ></q-btn>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  props: ["viewData"]
};
</script>
