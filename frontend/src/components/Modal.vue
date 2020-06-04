<template>
  <button>
    <v-icon small v-on:click.stop="dialog = true">{{
      icon ? icon : "mdi-delete"
    }}</v-icon>

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">
          {{ title ? title : "System message" }}
        </v-card-title>
        <v-divider class="mx-4" vertical></v-divider>

        <v-card-text>Are you sure?</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="blue darken-1" text v-on:click="dialog = false"
            >No</v-btn
          >

          <v-btn color="red darken-1" text v-on:click="yes">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </button>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "Modal",
  data() {
    return {
      dialog: false
    };
  },
  props: {
    method: Function,
    icon: String,
    title: String
  },
  methods: {
    yes() {
      this.$emit("method");
      this.dialog = false;
    }
  }
});
</script>
