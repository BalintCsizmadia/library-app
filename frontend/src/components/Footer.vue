<template>
  <v-footer dark padless>
    <v-card class="flex" flat tile>
      <v-card-text class="py-2 white--text text-center">
        <span>
          Source:
          <strong>
            <a href="https://moly.hu/" target="_blank" class="link">MOLY</a>
          </strong>
        </span>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "Footer"
});
</script>

<style scoped lang="scss">
.link {
  text-decoration: none;
  color: white;
  &:hover {
    color: #b3d4fc;
  }
}
</style>
