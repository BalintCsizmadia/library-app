<template>
  <v-app id="inspire">
    <!-- <v-container> -->
    <v-app-bar app color="teal darken-4" dark>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-tabs background-color="teal darken-3" class="elevation-2" dark>
        <v-tab>
          Search
        </v-tab>
        <v-tab
          v-on:click="
            changeEvent ? (changeEvent = false) : (changeEvent = true)
          "
        >
          Books
        </v-tab>
        <v-tab>
          Statistics
        </v-tab>

        <v-tab-item>
          <book-search />
        </v-tab-item>
        <v-tab-item>
          <book-list :changeEvent="changeEvent" />
        </v-tab-item>
        <v-tab-item>
          <book-statistics />
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
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import BookSearch from "./BookSearch.vue";
import BookList from "./BookList.vue";
import BookStatistics from "./BookStatistics.vue";

export default Vue.extend({
  name: "Main",
  components: {
    BookSearch,
    BookList,
    BookStatistics,
  },
  data: () => ({
    changeEvent: false,
    fab: false,
  }),
  props: {
    title: String,
  },
  methods: {
    onScroll(e: any) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 400;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
  },
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
