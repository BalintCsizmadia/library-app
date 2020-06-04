<template>
  <v-snackbar
    v-model="snackbar"
    :bottom="y === 'bottom'"
    :color="color"
    :left="x === 'left'"
    :right="x === 'right'"
    :timeout="timeout"
    :top="y === 'top'"
  >
    {{ text ? text : defaultText }}
    <v-btn dark text v-on:click="snackbar = false">
      Close
    </v-btn>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Notification",
  data: () => ({
    color: "success",
    snackbar: false,
    defaultText: "Success",
    timeout: 3000,
    x: "right",
    y: "bottom"
  }),
  props: {
    show: Boolean,
    text: String
  },
  watch: {
    show(value: boolean) {
      if (value) {
        this.snackbar = value;
      }
    }
  }
});
</script>
