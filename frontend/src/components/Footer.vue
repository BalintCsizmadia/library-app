<template>
  <v-footer class="bg-primary py-3">
    <v-container>
      <div class="d-flex align-center justify-center ga-2 text-white">
        <v-icon size="16" color="white">mdi-information-outline</v-icon>
        <span class="text-body-2">
          Data sourced from
          <a href="https://moly.hu/" target="_blank" class="footer-link font-weight-medium"
            >MOLY.hu</a
          >
        </span>
      </div>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts"></script>

<style scoped>
.footer-link {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
}
.footer-link:hover {
  color: #ffffff;
  text-decoration: underline;
}
</style>
