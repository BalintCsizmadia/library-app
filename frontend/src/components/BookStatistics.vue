<template>
  <div v-if="statistics">
    <v-row>
      <v-col cols="12" md="12">
        <v-card class="pa-2" outlined tile>
          <v-icon size="100" class="upper-space"
            >mdi-book-open-page-variant</v-icon
          >
          <h3 class="space custom-font">
            <span class="text">Books:</span> {{ statistics.numberOfBooks }}
          </h3>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6" md="6">
        <v-card class="pa-2" outlined tile>
          <v-icon>mdi-grease-pencil</v-icon>
          <v-card-title class="subheading font-weight-bold custom-padding"
            ><p class="custom-font text">
              Writer / Books
            </p>
          </v-card-title>

          <v-divider></v-divider>

          <v-list dense>
            <v-list-item
              v-for="author in statistics.topTenFavoriteAuthors"
              :key="author.name"
            >
              <v-list-item-content
                ><p>{{ author.name }}</p></v-list-item-content
              >
              <v-list-item-content class="align-end"
                ><p>{{ author.count }}</p></v-list-item-content
              >
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-card class="pa-2" outlined tile>
          <v-icon>mdi-calendar</v-icon>
          <v-card-title class="subheading font-weight-bold custom-padding">
            <p class="custom-font text">Year / Books</p>
          </v-card-title>

          <v-divider></v-divider>

          <v-list dense>
            <v-list-item
              v-for="book in statistics.topTenBooksPerReleaseYear"
              :key="book.year"
            >
              <v-list-item-content
                ><p>{{ book.year }}</p></v-list-item-content
              >
              <v-list-item-content class="align-end"
                ><p>{{ book.count }}</p></v-list-item-content
              >
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <v-card class="pa-2" outlined tile>
          <!-- <v-icon>mdi-tag</v-icon> -->
          <h3 class="space custom-font">
            <span class="text">Top tags</span>
          </h3>
          <div class="tags-container">
            <v-chip
              class="ma-2"
              v-for="tag in statistics.topTenTags"
              :key="tag.name"
            >
              {{ tag.name }}
            </v-chip>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row align="center" justify="center">
      <div class="top-rated-title-container">
        <h3 class="space custom-font">
          <span class="text">Most rated books</span>
        </h3>
      </div>
      <v-col
        cols="12"
        sm="4"
        md="2"
        v-for="book in statistics.mostRatedBooks"
        :key="book.id"
      >
        <v-card class="pa-2" outlined tile>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <img class="top-book-img" v-bind:src="book.cover" v-on="on" />
            </template>
            <span v-for="(author, index) in book.authors" :key="author.id">
              {{ author.name }}
              {{
                book.authors.length > 1 && book.authors.length !== index + 1
                  ? "&"
                  : ""
              }}
            </span>
            <span>- {{ book.title }}</span>
          </v-tooltip>
          <div>
            <p>
              {{ book.like_count }}
              <span class="like-btn"><v-icon small>mdi-thumb-up</v-icon></span>
            </p>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row align="center" justify="center">
      <div class="top-rated-title-container">
        <h3 class="space custom-font">
          <span class="text">Top rated books</span>
        </h3>
      </div>
      <v-col
        cols="12"
        sm="4"
        md="2"
        v-for="book in statistics.topRatedBooks"
        :key="book.id"
      >
        <v-card class="pa-2" outlined tile>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <img class="top-book-img" v-bind:src="book.cover" v-on="on" />
            </template>
            <span v-for="(author, index) in book.authors" :key="author.id">
              {{ author.name }}
              {{
                book.authors.length > 1 && book.authors.length !== index + 1
                  ? "&"
                  : ""
              }}
            </span>
            <span>- {{ book.title }}</span>
          </v-tooltip>
          <div>
            <v-rating
              v-model="book.like_average"
              color="yellow darken-3"
              background-color="grey darken-1"
              empty-icon="$ratingFull"
              half-increments
              readonly
              small
              dense
            ></v-rating>

            <p>
              {{ book.like_average.toFixed(2) }}
              <span class="like-btn"><v-icon small>mdi-percent</v-icon></span>
            </p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
  <div v-else>
    <p>No data available</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "BookStatistics",
  data: () => ({
    statistics: null,
  }),
  methods: {
    getStatistics() {
      this.axios.get("/books/statistics").then((response) => {
        if (response.data.statistics) {
          this.statistics = response.data.statistics;
        }
      });
    },
  },
  created() {
    (this as any).getStatistics();
  },
});
</script>

<style scoped>
.text {
  color: #757575;
  margin: auto;
}
.upper-space {
  margin-top: 10px;
}
.space {
  margin: 25px;
}
.custom-font {
  font-size: 20px;
}
.custom-padding {
  padding-top: 10px;
}
.tags-container {
  margin: 0 5rem 25px;
}
.top-rated-title-container {
  width: 100%;
}
.like-btn {
  display: inline-flex;
  margin-left: 5px;
}
.top-book-img {
  margin: 1rem;
}
</style>
