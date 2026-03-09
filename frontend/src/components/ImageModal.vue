<template>
  <button>
    <v-img :src="image" alt="cover" width="30px" @click.stop="dialog = true"></v-img>

    <v-dialog v-model="dialog" max-width="450">
      <v-card style="align-items: center">
        <img :src="image.replace('normal', 'big')" width="400" class="cover-image" />

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">Back</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ image: string }>();

const dialog = ref(false);
</script>

<style scoped>
.cover-image {
  margin-top: 30px;
  margin-bottom: -10px;
}
</style>
