<template>
  <v-container class="pa-6 pa-md-10">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <div class="text-center mb-8">
          <v-icon size="64" color="primary" class="mb-3">mdi-book-search</v-icon>
          <h1 class="text-h5 font-weight-bold mb-1">Find a Book</h1>
          <p class="text-body-2 text-medium-emphasis">
            Search by title or author — results appear after every 3rd character
          </p>
        </div>

        <v-autocomplete
          v-model="model"
          :items="items"
          :loading="isLoading"
          v-model:search="search"
          variant="outlined"
          rounded="lg"
          density="comfortable"
          placeholder="Start typing to search..."
          prepend-inner-icon="mdi-magnify"
          item-title="fullName"
          item-value="id"
          return-object
          clearable
          color="primary"
          hide-no-data
          hide-selected
        ></v-autocomplete>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-expand-transition>
          <BookDetails v-if="model" :book="book" />
        </v-expand-transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import BookDetails from "./BookDetails.vue";
import type BasicBook from "../model/book-basic.interface";
import type Book from "../model/book.interface";
import api from "../api/axios";

const isLoading = ref(false);
const model = ref<(BasicBook & { fullName: string }) | null>(null);
const search = ref<string | undefined>(undefined);
const books = ref<BasicBook[]>([]);
const book = ref<Partial<Book>>({});

const items = computed(() =>
  books.value.map((item: BasicBook) => ({
    ...item,
    fullName: `${item.author} - ${item.title}`
  }))
);

watch(search, (val: string | undefined) => {
  if (val && val.length % 3 === 0) {
    if (isLoading.value) return;
    isLoading.value = true;
    api
      .get("/books", { params: { search: val.trim() } })
      .then((res: { data: { books: BasicBook[] } }) => {
        books.value = res.data.books;
      })
      .catch(console.error)
      .finally(() => (isLoading.value = false));
  }
});

watch(model, (m) => {
  if (m && m.id) {
    api
      .get(`/books/${m.id}`)
      .then((response: { data: { book: Book } }) => {
        book.value = response.data.book;
      })
      .catch(console.error);
  }
});
</script>
