<template>
  <v-col xs="12">
    <v-card color="teal darken-2" dark>
      <!-- <v-card-title class="headline red lighten-3">Search for Books</v-card-title> -->
      <v-card-text>
        <v-autocomplete
          v-model="model"
          :items="items"
          :loading="isLoading"
          :search-input.sync="search"
          color="white"
          hide-no-data
          hide-selected
          item-text="fullName"
          item-value="id"
          placeholder="Start typing to Search"
          prepend-icon="mdi-database-search"
          return-object
        ></v-autocomplete>
      </v-card-text>
      <v-divider></v-divider>
      <v-expand-transition>
        <BookDetails v-if="model" :book="book" :fields="fields" />
      </v-expand-transition>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!model" color="grey darken-3" @click="model = null">
          Clear
          <v-icon right>mdi-close-circle</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import Vue from "vue";
import BookDetails from "./BookDetails.vue";

export default Vue.extend({
  name: "BookSearch",
  components: {
    BookDetails
  },
  data: () => ({
    isLoading: false,
    model: null,
    search: null,
    books: [],
    book: {}
  }),
  computed: {
    items() {
      return this.books.map(item => {
        const fullName = `${item.author} - ${item.title}`;
        return Object.assign({}, item, { fullName });
      });
    },
    fields() {
      if (!this.model) return [];
      return Object.keys(this.model).map(key => {
        return {
          key,
          value: this.model[key] || "n/a"
        };
      });
    }
  },
  watch: {
    search(val) {
      // reload list after every 3rd typed character
      if (val && val.length % 3 === 0) {
        if (this.isLoading) return;

        this.isLoading = true;

        this.axios
          .get("/books", { params: { search: val } })
          .then(res => {
            this.books = res.data.books;
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => (this.isLoading = false));
      }
    },
    model(m) {
      if (m.id) {
        this.axios
          .get(`/books/${m.id}`)
          .then(response => (this.book = response.data.book))
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
});
</script>

<style></style>
