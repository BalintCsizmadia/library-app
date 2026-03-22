<template>
  <v-card rounded="xl" elevation="2" class="overflow-hidden">
    <div class="d-flex flex-column flex-sm-row">
      <!-- Cover image -->
      <v-img
        v-if="book.cover"
        :src="getBigCoverImage(book.cover)"
        width="200"
        min-width="200"
        max-height="320"
        cover
        class="flex-shrink-0"
      />
      <div
        v-else
        class="d-flex align-center justify-center bg-surface-variant flex-shrink-0"
        style="min-width: 200px; min-height: 240px"
      >
        <v-icon size="72" color="secondary">mdi-book-open-page-variant</v-icon>
      </div>

      <!-- Book info -->
      <div class="flex-grow-1 pa-5">
        <h2 class="text-h5 font-weight-bold mb-1">{{ book.title || '—' }}</h2>
        <p class="text-subtitle-1 text-secondary font-weight-medium mb-4">
          {{ book.authors?.map((a) => a.name).join(', ') || 'Unknown author' }}
        </p>

        <div class="d-flex flex-wrap ga-2 mb-4">
          <v-chip
            v-if="book.year_of_publishing"
            size="small"
            color="primary"
            variant="tonal"
            prepend-icon="mdi-calendar"
            >{{ book.year_of_publishing }}</v-chip
          >
          <v-chip
            v-if="book.like_count"
            size="small"
            color="secondary"
            variant="tonal"
            prepend-icon="mdi-thumb-up"
            >{{ book.like_count }} likes</v-chip
          >
          <v-chip
            v-if="book.reviews_count"
            size="small"
            variant="tonal"
            prepend-icon="mdi-comment-text"
            >{{ book.reviews_count }} reviews</v-chip
          >
        </div>

        <p v-if="book.description" class="text-body-2 text-medium-emphasis mb-5 book-description">
          {{ book.description }}
        </p>

        <v-btn
          v-if="!savedBookIds.has(book.id!)"
          color="secondary"
          rounded="lg"
          variant="elevated"
          prepend-icon="mdi-bookmark-plus"
          :loading="adding"
          @click="addToList(book)"
          >Add to my list</v-btn
        >
        <v-chip v-else variant="outlined" prepend-icon="mdi-check"> Already in your list </v-chip>
      </div>
    </div>
    <notification :show="showNotification" text="Book added to your list!" />
  </v-card>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import Notification from './Notification.vue';
import type Book from '../model/book.interface';
import api from '../api/apiClient';

const { book, savedBookIds } = defineProps<{ book: Partial<Book>; savedBookIds: Set<number> }>();
const emit = defineEmits<{ added: [id: number] }>();

const showNotification = ref(false);
const adding = ref(false);

function getBigCoverImage(coverUrl: string) {
  return coverUrl.replace('normal', 'big');
}

async function addToList(book: Partial<Book>) {
  adding.value = true;
  try {
    await api.post(`books/${book.id}`, { json: { book } });
    emit('added', book.id!);
  } catch (e) {
    console.error(e);
  }
  adding.value = false;
  showNotification.value = false;
  await nextTick();
  showNotification.value = true;
  nextTick(() => {
    showNotification.value = false;
  });
}
</script>

<style scoped>
.book-description {
  max-height: 130px;
  overflow-y: auto;
  line-height: 1.7;
}
</style>
