<template>
  <v-list :class="color ? color : 'teal darken-3'">
    <v-parallax dark src="../assets/book.jpg">
      <img class="cover-img" v-bind:src="getBigCoverImage(book.cover)" />
    </v-parallax>

    <p class="text-center text-padding">{{ book.description }}</p>
    <v-list-item
      v-for="(field, i) in fields"
      :key="i"
      :style="handleTextDisplay(field.key)"
    >
      <v-list-item-content>
        <v-list-item-subtitle v-text="field.key"></v-list-item-subtitle>
        <v-list-item-title v-text="field.value"></v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-subtitle v-text="'release'"></v-list-item-subtitle>
        <v-list-item-title
          v-text="book.year_of_publishing || 'n/a'"
        ></v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <notification :show="showNotification" text="Success" />

    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <v-btn
          fixed
          dark
          fab
          bottom
          right
          large
          :color="background"
          class="add-button"
          v-on:click="addToList(book)"
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <span>Add to my list</span>
    </v-tooltip>
  </v-list>
</template>

<script lang="ts">
import Vue from "vue";
import Notification from "./Notification.vue";
import Book from "../model/book.interface";

export default Vue.extend({
  name: "BookDetails",
  data: () => ({
    showNotification: false,
    background: "pink"
  }),
  props: {
    book: Object,
    fields: Array,
    color: String
  },
  components: {
    Notification
  },
  methods: {
    handleTextDisplay(key: string) {
      return key === "fullName" ? "display: none;" : "";
    },
    addToList(book: Book) {
      this.showNotification = true;
      return this.axios.post(`/books/${book.id}`, { book }).then(res => {
        this.showNotification = false;
        this.background = "green darken-3";
      });
    },
    getBigCoverImage(coverUrl: string) {
      if (coverUrl) {
        return coverUrl.replace("normal", "big");
      }
    }
  }
});
</script>

<style scoped>
.cover-img {
  width: 300px;
  margin: auto;
}
.text-padding {
  padding: 1rem 5rem 1rem;
}
.add-button {
  margin: 0 25px 20px 0;
}
</style>
