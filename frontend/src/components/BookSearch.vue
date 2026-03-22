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
          v-model:search="search"
          :items="items"
          :loading="isLoading"
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
import { ref, computed, watch } from 'vue';
import BookDetails from './BookDetails.vue';
import type BasicBook from '../model/book-basic.interface';
import type Book from '../model/book.interface';
import api from '../api/apiClient';

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

watch(search, async (val: string | undefined) => {
  if (val && val.length % 3 === 0) {
    if (isLoading.value) return;
    isLoading.value = true;
    try {
      const data = await api
        .get('books', { searchParams: { search: val.trim() } })
        .json<{ books: BasicBook[] }>();
      books.value = data.books;
    } catch (e) {
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  }
});

watch(model, async (m) => {
  if (m && m.id) {
    try {
      const data = await api.get(`books/${m.id}`).json<{ book: Book }>();
      book.value = data.book;
    } catch (e) {
      console.error(e);
    }
  }
});
</script>
