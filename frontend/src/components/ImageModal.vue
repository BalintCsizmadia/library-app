<template>
  <button>
    <v-img
      :src="image"
      alt="cover"
      width="30px"
      v-on:click.stop="dialog = true"
    ></v-img>

    <v-dialog v-model="dialog" max-width="450">
      <v-card>
        <img
          :src="image.replace('normal', 'big')"
          width="400"
          class="cover-image"
        />

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="blue darken-1" text v-on:click="dialog = false"
            >Back</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </button>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "ImageModal",
  data() {
    return {
      dialog: false
    };
  },
  props: {
    image: String
  }
});
</script>

<style scoped>
.cover-image {
  margin-top: 30px;
  margin-bottom: -10px;
}
</style>
