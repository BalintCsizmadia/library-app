<template>
  <v-container class="pa-6">
    <v-card rounded="xl" elevation="1">
      <div class="d-flex align-center justify-space-between flex-wrap ga-3 pa-4 pb-2">
        <div class="d-flex align-center ga-2">
          <v-icon color="primary">mdi-bookshelf</v-icon>
          <span class="text-h6 font-weight-bold">My Book Collection</span>
        </div>
      </div>

      <div class="px-4 pb-3">
        <v-text-field
          v-model="search"
          append-inner-icon="mdi-magnify"
          label="Filter books..."
          single-line
          hide-details
          variant="outlined"
          density="compact"
          rounded="lg"
          color="primary"
        ></v-text-field>
      </div>

      <v-data-table
        v-model:expanded="expanded"
        :headers="headers"
        :items="items"
        :search="search"
        :loading="isLoading"
        :items-per-page-options="footerProps['items-per-page-options']"
        loading-text="Loading... Please wait"
        hover
      >
        <template #[`item.cover`]="{ item }">
          <div class="py-1">
            <image-modal :image="item.cover" />
          </div>
        </template>

        <template #expanded-row="{ columns, item }">
          <tr>
            <td :colspan="columns.length" class="book-descr">{{ item.description }}</td>
          </tr>
        </template>

        <template #[`item.actions`]="{ item }">
          <v-icon
            size="small"
            class="mr-2"
            :color="item.like ? 'secondary' : 'grey-lighten-1'"
            @click="rateItem(item)"
            >mdi-star</v-icon
          >
          <modal icon="mdi-delete" title="Delete" @method="deleteItem(item.id)" />
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import Modal from './Modal.vue';
import ImageModal from './ImageModal.vue';
import type Book from '../model/book.interface';
import api from '../api/axios';

const props = defineProps<{ changeBook: boolean }>();

const isLoading = ref(false);
const search = ref<string | undefined>(undefined);
const books = ref<Book[]>([]);
const expanded = ref<string[]>([]);

const headers = [
  { title: 'Authors', value: 'authorsNames' },
  { title: 'Title', value: 'title' },
  { title: 'Release', value: 'year_of_publishing' },
  { title: 'Cover', value: 'cover', sortable: false },
  { title: 'Description', value: 'data-table-expand', align: 'center' as const },
  { title: 'Actions', value: 'actions', sortable: false }
];

const footerProps = {
  'items-per-page-options': [10, 25, 50, -1]
};

const items = computed(() =>
  books.value.map((item: Book) => {
    const mapped = { ...item };
    if (!mapped.year_of_publishing) mapped.year_of_publishing = 'n/a';
    if (!mapped.authors.length) mapped.authors = [{ name: 'Various authors' }];
    const authorsNames = mapped.authors.map((a) => a.name).join(', ');
    return { ...mapped, authorsNames };
  })
);

function loadList() {
  isLoading.value = true;
  api
    .get('/books/my-books')
    .then((response: { data: { books: { table: Book[] } } }) => {
      books.value = response.data.books.table;
    })
    .catch(console.error)
    .finally(() => (isLoading.value = false));
}

function rateItem(item: Book) {
  item.like = true;
}

function deleteItem(id: number) {
  api.delete(`/books/${id}`).then(() => loadList());
}

onMounted(() => loadList());

watch(
  () => props.changeBook,
  () => loadList()
);

watch(expanded, (val) => {
  if (val.length > 1) {
    expanded.value = [val[val.length - 1]];
  }
});
</script>

<style>
.book-descr {
  padding: 20px !important;
}
</style>
