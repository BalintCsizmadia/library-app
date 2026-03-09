<template>
  <v-app>
    <v-app-bar color="primary" elevation="0" border="b">
      <template #prepend>
        <v-icon class="ms-3" size="26">mdi-bookshelf</v-icon>
      </template>
      <v-app-bar-title class="font-weight-bold">{{ title }}</v-app-bar-title>
      <template #append>
        <v-btn
          :icon="isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          variant="text"
          class="me-1"
          @click="isDark = !isDark"
        />
      </template>
    </v-app-bar>

    <v-main class="bg-background">
      <v-tabs
        v-model="tab"
        color="secondary"
        bg-color="primary"
        align-tabs="center"
        class="elevation-1"
      >
        <v-tab value="search" prepend-icon="mdi-magnify">Search</v-tab>
        <v-tab
          value="books"
          prepend-icon="mdi-format-list-bulleted"
          @click="changeBook = !changeBook"
          >My Books</v-tab
        >
        <v-tab
          value="statistics"
          prepend-icon="mdi-chart-box"
          @click="changeStatistics = !changeStatistics"
          >Statistics</v-tab
        >
      </v-tabs>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="search">
          <book-search />
        </v-tabs-window-item>
        <v-tabs-window-item value="books">
          <book-list :change-book="changeBook" />
        </v-tabs-window-item>
        <v-tabs-window-item value="statistics">
          <book-statistics :change-statistics="changeStatistics" />
        </v-tabs-window-item>
      </v-tabs-window>
    </v-main>

    <v-btn
      v-show="fab"
      v-scroll="onScroll"
      icon
      size="large"
      color="primary"
      style="position: fixed; bottom: 24px; right: 24px; z-index: 1000"
      elevation="4"
      @click="toTop"
    >
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
    <Footer />
  </v-app>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useTheme, useGoTo } from 'vuetify';
import BookSearch from './BookSearch.vue';
import BookList from './BookList.vue';
import BookStatistics from './BookStatistics.vue';
import Footer from './Footer.vue';

defineProps<{ title: string }>();

const vuetifyTheme = useTheme();
const goTo = useGoTo();

const tab = ref('search');
const changeBook = ref(false);
const changeStatistics = ref(false);
const fab = ref(false);
const isDark = ref(false);

function onScroll(e: Event) {
  if (typeof window === 'undefined') return;
  const top = window.pageYOffset || (e.target as HTMLElement).scrollTop || 0;
  fab.value = top > 400;
}

function toTop() {
  goTo(0);
}

watch(isDark, (dark: boolean) => {
  vuetifyTheme.global.name.value = dark ? 'dark' : 'light';
});
</script>
