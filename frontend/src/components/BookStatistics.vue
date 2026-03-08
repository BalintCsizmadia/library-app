<template>
  <v-container v-if="statistics" class="pa-6">
    <!-- Hero stat card -->
    <v-row class="mb-4">
      <v-col cols="12">
        <v-card rounded="xl" color="primary" class="pa-6 text-center">
          <v-icon size="52" class="mb-2" color="white">mdi-bookshelf</v-icon>
          <div class="text-h2 font-weight-bold text-white mb-1">{{ statistics.numberOfBooks }}</div>
          <div class="text-body-1 text-white" style="opacity:0.85">Books in your collection</div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Top authors + release years -->
    <v-row>
      <v-col cols="12" sm="6">
        <v-card rounded="xl" elevation="1">
          <v-card-title class="d-flex align-center ga-2 py-3 px-4">
            <v-icon color="primary">mdi-account-edit</v-icon>
            <span class="font-weight-bold">Top Authors</span>
          </v-card-title>
          <v-divider />
          <v-list density="compact" lines="one">
            <v-list-item
              v-for="(author, i) in statistics.topTenFavoriteAuthors"
              :key="author.name"
            >
              <template #prepend>
                <v-avatar size="26" color="primary" variant="tonal" class="text-caption font-weight-bold">
                  {{ Number(i) + 1 }}
                </v-avatar>
              </template>
              <template #title>{{ author.name }}</template>
              <template #append>
                <v-chip size="x-small" color="secondary" variant="tonal">{{ author.count }}</v-chip>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6">
        <v-card rounded="xl" elevation="1">
          <v-card-title class="d-flex align-center ga-2 py-3 px-4">
            <v-icon color="primary">mdi-calendar-range</v-icon>
            <span class="font-weight-bold">By Release Year</span>
          </v-card-title>
          <v-divider />
          <v-list density="compact" lines="one">
            <v-list-item
              v-for="(entry, i) in statistics.topTenBooksPerReleaseYear"
              :key="entry.year"
            >
              <template #prepend>
                <v-avatar size="26" color="primary" variant="tonal" class="text-caption font-weight-bold">
                  {{ Number(i) + 1 }}
                </v-avatar>
              </template>
              <template #title>{{ entry.year }}</template>
              <template #append>
                <v-chip size="x-small" color="secondary" variant="tonal">{{ entry.count }}</v-chip>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <!-- Top tags -->
    <v-row class="mt-1">
      <v-col cols="12">
        <v-card rounded="xl" elevation="1">
          <v-card-title class="d-flex align-center ga-2 py-3 px-4">
            <v-icon color="primary">mdi-tag-multiple</v-icon>
            <span class="font-weight-bold">Top Tags</span>
          </v-card-title>
          <v-divider />
          <v-card-text class="d-flex flex-wrap ga-2 pt-3">
            <v-chip
              v-for="tag in statistics.topTenTags"
              :key="tag.name"
              color="primary"
              variant="tonal"
              size="small"
            >{{ tag.name }}</v-chip>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Most liked -->
    <v-row class="mt-2">
      <v-col cols="12">
        <div class="d-flex align-center ga-2 mb-3 px-1">
          <v-icon color="secondary">mdi-thumb-up</v-icon>
          <span class="text-h6 font-weight-bold">Most Liked</span>
        </div>
        <v-row dense>
          <v-col
            v-for="book in statistics.mostRatedBooks"
            :key="book.id"
            cols="6" sm="4" md="3" lg="2"
          >
            <v-card rounded="xl" elevation="1">
              <v-tooltip
                :text="`${book.authors.map(a => a.name).join(' & ')} — ${book.title}`"
                location="top"
              >
                <template #activator="{ props: tp }">
                  <v-img :src="book.cover" height="150" cover v-bind="tp" />
                </template>
              </v-tooltip>
              <v-card-text class="py-2 text-center">
                <v-chip prepend-icon="mdi-thumb-up" size="x-small" color="secondary" variant="tonal">
                  {{ book.like_count }}
                </v-chip>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Top rated -->
    <v-row class="mt-2 mb-4">
      <v-col cols="12">
        <div class="d-flex align-center ga-2 mb-3 px-1">
          <v-icon color="secondary">mdi-star</v-icon>
          <span class="text-h6 font-weight-bold">Top Rated</span>
        </div>
        <v-row dense>
          <v-col
            v-for="book in statistics.topRatedBooks"
            :key="book.id"
            cols="6" sm="4" md="3" lg="2"
          >
            <v-card rounded="xl" elevation="1">
              <v-tooltip
                :text="`${book.authors.map(a => a.name).join(' & ')} — ${book.title}`"
                location="top"
              >
                <template #activator="{ props: tp }">
                  <v-img :src="book.cover" height="150" cover v-bind="tp" />
                </template>
              </v-tooltip>
              <v-card-text class="py-2 text-center">
                <v-rating
                  :model-value="book.like_average"
                  color="secondary"
                  half-increments
                  readonly
                  density="compact"
                  size="x-small"
                />
                <div class="text-caption text-medium-emphasis">{{ book.like_average.toFixed(1) }}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>

  <v-container v-else class="text-center py-12">
    <v-icon size="80" color="medium-emphasis">mdi-chart-box-outline</v-icon>
    <p class="text-h6 text-medium-emphasis mt-4">No statistics available yet</p>
    <p class="text-body-2 text-medium-emphasis">Switch to this tab to load data</p>
  </v-container>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import type BookStatisticsModel from "../model/book-statistics.interface";
import api from "../api/axios";

const props = defineProps<{ changeStatistics: boolean }>();

const statistics = ref<BookStatisticsModel | null>(null);

function getStatistics() {
  api
    .get("/books/statistics")
    .then((response: { data: { statistics: BookStatisticsModel } }) => {
      if (response.data.statistics) {
        statistics.value = response.data.statistics;
      }
    })
    .catch(console.error);
}

onMounted(() => getStatistics());

watch(
  () => props.changeStatistics,
  () => getStatistics()
);
</script>

<style scoped>
.book-description {
  max-height: 100px;
  overflow-y: auto;
}
</style>
