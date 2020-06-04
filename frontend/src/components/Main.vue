<template>
  <v-app id="inspire">
    <!-- <v-container> -->
    <v-app-bar app :color="theme.header" dark>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-switch
        v-model="isDark"
        class="mx-2"
        label="Dark mode"
        hide-details
      ></v-switch>
    </v-app-bar>

    <v-content>
      <v-tabs :background-color="theme.subHeader" class="elevation-2" dark>
        <v-tab>Search</v-tab>
        <v-tab
          v-on:click="changeBook ? (changeBook = false) : (changeBook = true)"
          >Books</v-tab
        >
        <v-tab
          v-on:click="
            changeStatistics
              ? (changeStatistics = false)
              : (changeStatistics = true)
          "
          >Statistics</v-tab
        >
        <v-tab-item>
          <book-search :theme="theme" />
        </v-tab-item>
        <v-tab-item>
          <book-list :changeBook="changeBook" />
        </v-tab-item>
        <v-tab-item>
          <book-statistics :changeStatistics="changeStatistics" />
        </v-tab-item>
      </v-tabs>
    </v-content>
    <!-- </v-container> -->
    <v-btn
      v-scroll="onScroll"
      v-show="fab"
      fab
      dark
      fixed
      bottom
      right
      large
      color="primary"
      v-on:click="toTop"
    >
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import BookSearch from "./BookSearch.vue";
import BookList from "./BookList.vue";
import BookStatistics from "./BookStatistics.vue";
import Footer from "./Footer.vue";
import { Theme } from "../model/theme.enum";

export default Vue.extend({
  name: "Main",
  components: {
    BookSearch,
    BookList,
    BookStatistics,
    Footer
  },
  data: () => ({
    changeBook: false,
    changeStatistics: false,
    fab: false,
    theme: {
      header: "teal darken-4",
      subHeader: "teal darken-3",
      item: "teal darken-2",
      subItem: "teal darken-3"
    },
    isDark: false
  }),
  props: {
    title: String
  },
  methods: {
    onScroll(e: { target: HTMLInputElement }) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 400;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
    setTheme(theme: Theme) {
      if (theme === Theme.LIGHT) {
        this.theme = {
          header: "teal darken-4",
          subHeader: "teal darken-3",
          item: "teal darken-2",
          subItem: "teal darken-3"
        };
      } else if (theme === Theme.DARK) {
        this.theme = {
          header: "black",
          subHeader: "#121212",
          item: "#1E1E1E",
          subItem: "black"
        };
      } else {
        throw new Error("Invalid theme");
      }
    }
  },
  watch: {
    isDark(dark: boolean) {
      if (!dark) {
        this.$vuetify.theme.dark = false;
        this.setTheme(Theme.LIGHT);
      } else {
        this.$vuetify.theme.dark = true;
        this.setTheme(Theme.DARK);
      }
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
