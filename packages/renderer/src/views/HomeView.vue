<template>
  <h1>Home</h1>
  <router-link
    v-for="link in routes"
    :key="link.name"
    :to="{ name: link.name }"
  >
    <p>{{ link.name }}</p>
  </router-link>

  <span class="test">This is the End!</span>
</template>
<script setup lang="ts">
import { routes } from "../infra/router";
</script>

<style scoped lang="scss">
.test{
  position:fixed;
  bottom:0;
  right:0
}
</style>
