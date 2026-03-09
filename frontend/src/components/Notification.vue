<template>
  <v-snackbar v-model="snackbar" :color="color" :timeout="timeout" location="bottom right">
    {{ text ?? defaultText }}
    <template #actions>
      <v-btn variant="text" @click="snackbar = false">Close</v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  show: boolean;
  text?: string;
}>();

const color = ref('success');
const snackbar = ref(false);
const defaultText = 'Success';
const timeout = ref(3000);

watch(
  () => props.show,
  (value: boolean) => {
    if (value) snackbar.value = true;
  }
);
</script>
