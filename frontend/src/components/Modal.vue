<template>
  <button>
    <v-icon size="small" @click.stop="dialog = true">{{ icon ?? 'mdi-delete' }}</v-icon>

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="text-h6">
          {{ title ?? 'System message' }}
        </v-card-title>
        <v-divider class="mx-4"></v-divider>

        <v-card-text>Are you sure?</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">No</v-btn>
          <v-btn color="red-darken-1" variant="text" @click="yes">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  icon?: string;
  title?: string;
}>();

const emit = defineEmits<{ (e: 'method'): void }>();

const dialog = ref(false);

function yes() {
  emit('method');
  dialog.value = false;
}
</script>
