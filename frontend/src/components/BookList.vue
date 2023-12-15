<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      class="elevation-1"
      :headers="headers"
      :items="items"
      :search="search"
      :loading="isLoading"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      show-expand
      :footer-props="footerProps"
      loading-text="Loading... Please wait"
    >
      <v-switch
        v-model="singleExpand"
        label="Single expand"
        class="mt-2"
      ></v-switch>

      <template v-slot:item.cover="{ item }">
        <div class="p-2">
          <image-modal :image="item.cover" />
        </div>
      </template>

      <template v-slot:expanded-item="{ headers, item }">
        <td class="book-descr" :colspan="headers.length">{{ item.description }}</td>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          id="star"
          v-on:click="rateItem(item)"
          :color="item.like ? '#FFAB00' : ''"
          >mdi-star</v-icon
        >

        <modal
          v-on:method="deleteItem(item.id)"
          icon="mdi-delete"
          title="Delete"
        />
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Modal from "./Modal.vue";
import ImageModal from "./ImageModal.vue";
import Book from "../model/book.interface";

export default Vue.extend({
  name: "BookList",
  data: () => ({
    isLoading: false,
    search: null,
    books: [] as Book[],
    expanded: [],
    singleExpand: false,
    headers: [
      { text: "Authors", value: "authorsNames" },
      { text: "Title", value: "title" },
      { text: "Release", value: "year_of_publishing" },
      { text: "Cover", value: "cover", sortable: false },
      { text: "Description", value: "data-table-expand", align: "center" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    footerProps: {
      "items-per-page-options": [10, 25, 50, -1]
    }
  }),
  props: {
    changeBook: Boolean
  },
  components: {
    Modal,
    ImageModal
  },
  created() {
    (this as any).loadList();
  },
  computed: {
    items() {
      return this.books.map((item: Book) => {
        if (!item["year_of_publishing"]) {
          item["year_of_publishing"] = "n/a";
        }
        if (!item.authors.length) {
          item.authors.push({ name: "Various authors" });
        }
        const fullName: string[] = [];
        item.authors.map((i: { id?: number; name: string }) => {
          fullName.push(i.name);
        });
        const authorsNames = fullName.join(", ");
        return Object.assign({}, item, { authorsNames });
      });
    }
  },
  watch: {
    changeBook(value: boolean) {
      (this as any).loadList();
    }
  },
  methods: {
    loadList() {
      this.isLoading = true;
      this.axios
        .get("/books/my-books")
        .then((response: { data: { books: { table: Book[] } } }) => {
          this.books = response.data.books.table;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
    rateItem(item: any) {
      // TODO
      item.like = true;
      return item;
    },
    deleteItem(id: number) {
      this.axios.delete(`/books/${id}`).then(() => {
        (this as any).loadList();
      });
    }
  }
});
</script>

<style>
.book-descr {
  padding: 20px !important;
}

#star:hover {
  color: #ffab00;
}
</style>
