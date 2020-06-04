<template>
  <v-col xs="12">
    <v-card :color="theme.item" dark>
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
        <BookDetails
          v-if="model"
          :book="book"
          :fields="fields"
          :color="theme.subItem"
        />
      </v-expand-transition>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!model"
          color="grey darken-3"
          v-on:click="model = null"
        >
          Clear
          <v-icon right>mdi-close-circle</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import BookDetails from "./BookDetails.vue";
import BasicBook from "../model/book-basic.interface";
import Book from "../model/book.interface";

export default Vue.extend({
  name: "BookSearch",
  components: {
    BookDetails
  },
  data: () => ({
    isLoading: false,
    model: null,
    search: null,
    books: [] as BasicBook[],
    book: {}
  }),
  props: {
    theme: Object
  },
  computed: {
    items() {
      if (this.books) {
        return this.books.map((item: BasicBook) => {
          const fullName = `${item.author} - ${item.title}`;
          return Object.assign({}, item, { fullName });
        });
      } else {
        return [];
      }
    },
    fields() {
      if (!this.model) return [];
      return Object.keys((this as any).model).map((key: any) => {
        return {
          key,
          value: (this as any).model[key] || "n/a"
        };
      });
    }
  },
  watch: {
    search(val: string) {
      // reload list after every 3rd typed character
      if (val && val.length % 3 === 0) {
        if (this.isLoading) return;

        this.isLoading = true;

        this.axios
          .get("/books", { params: { search: val.trim() } })
          .then((res: { data: { books: BasicBook[] } }) => {
            this.books = res.data.books;
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => (this.isLoading = false));
      }
    },
    model(m: Book) {
      if (m && m.id) {
        this.axios
          .get(`/books/${m.id}`)
          .then(
            (response: { data: { book: Book } }) =>
              (this.book = response.data.book)
          )
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
});
</script>

<style></style>
