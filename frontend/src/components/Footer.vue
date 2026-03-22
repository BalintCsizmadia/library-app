<template>
  <footer class="footer-bar">
    <div class="d-flex align-center justify-center ga-2">
      <v-icon size="14" class="footer-icon">mdi-information-outline</v-icon>
      <span class="text-caption footer-text">
        Data sourced from
        <a href="https://moly.hu/" target="_blank" class="footer-link font-weight-medium">MOLY.hu</a>
      </span>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped>
.footer-bar {
  padding: 6px 16px;
  border-top: 1px solid rgba(128, 128, 128, 0.15);
  text-align: center;
}
.footer-text {
  font-size: 0.75rem;
  color: rgba(128, 128, 128, 0.7);
}
.footer-icon {
  color: rgba(128, 128, 128, 0.5);
}
.footer-link {
  color: rgba(128, 128, 128, 0.85);
  text-decoration: none;
}
.footer-link:hover {
  color: rgba(128, 128, 128, 1);
  text-decoration: underline;
}
</style>
